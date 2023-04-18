<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import { Apis } from 'bitsharesjs-ws';
	import {
		ChainStore,
		FetchChain,
		PrivateKey,
		TransactionHelper,
		Aes,
		TransactionBuilder
	} from 'bitsharesjs';

	function testConnect() {
		var witness_node = 'ws://mint.peerplays.download:8090';

		Apis.instance(witness_node, true).init_promise.then((res) => {
			console.log('YESS!!! connected to:', res[0].network);
		});
	}
	//testConnect();
	function testTransfer() {
		var witness_node = 'ws://mint.peerplays.download:8090';
		var nobroadcast = false;
		var amount_to_send = 10000;
		var asset_to_send = 'TEST';
		var from_account = 'baris801';
		var to_account = 'baris802';
		var memo_text = 'Your memo goes in here..';

		let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
		let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

		Apis.instance(witness_node, true).init_promise.then((res) => {
			console.log('connected to:', res[0].network);

			ChainStore.init(nobroadcast).then(() => {
				let fromAccount = from_account;
				let memoSender = fromAccount;
				let memo = memo_text;

				let toAccount = to_account;

				let sendAmount = {
					amount: amount_to_send,
					asset: asset_to_send
				};

				Promise.all([
					FetchChain('getAccount', fromAccount),
					FetchChain('getAccount', toAccount),
					FetchChain('getAccount', memoSender),
					FetchChain('getAsset', sendAmount.asset),
					FetchChain('getAsset', sendAmount.asset)
				]).then((res) => {
					// console.log("got data:", res);
					let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = res;

					// Memos are optional, but if you have one you need to encrypt it here
					let memoFromKey = memoSender.getIn(['options', 'memo_key']);
					console.log('memo pub key:', memoFromKey);
					let memoToKey = toAccount.getIn(['options', 'memo_key']);
					let nonce = TransactionHelper.unique_nonce_uint64();

					let memo_object = {
						from: memoFromKey,
						to: memoToKey,
						nonce,
						message: Aes.encrypt_with_checksum(pKeyMemo, memoToKey, nonce, memo)
					};

					let tr = new TransactionBuilder();

					tr.add_type_operation('transfer', {
						fee: {
							amount: 0,
							asset_id: feeAsset.get('id')
						},
						from: fromAccount.get('id'),
						to: toAccount.get('id'),
						amount: { amount: sendAmount.amount, asset_id: sendAsset.get('id') },
						memo: memo_object
					});

					tr.set_required_fees().then(() => {
						tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
						console.log('serialized transaction:', tr.serialize());
						tr.broadcast();
					});
				});
			});
		});
	}

	//testTransfer();
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<!--
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		-->
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
