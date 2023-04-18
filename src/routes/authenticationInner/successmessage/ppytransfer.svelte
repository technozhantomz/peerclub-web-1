<script>
	import Link from 'svelte-link';
	import { Card, CardBody, Col, Container, Row } from 'sveltestrap';
	import ParticlesAuth from '../ParticlesAuth.svelte';

	//import images
	import logoLight from '../../../assets/images/logo-light.png';

	import { Apis } from 'peerplaysjs-lib/dist/index.js';
	
	//import { Apis } from 'bitsharesjs-ws';
	import {
		ChainStore,
		FetchChain,
		PrivateKey,
		TransactionHelper,
		Aes,
		TransactionBuilder
	} 
	from 'peerplaysjs-lib/dist/index.js';

	console.log('comp svelte');

	function testTransfer() {
		var witness_node = 'ws://mint.peerplays.download:8090';
		var nobroadcast = false;
		var amount_to_send = 10000;
		var asset_to_send = 'TEST';
		var from_account = 'nathan';
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
	
testTransfer();
</script>

<svelte:head>
	<title>Success Message | Homepesa Mega platform</title>
</svelte:head>
<div class="auth-page-wrapper">
	<ParticlesAuth>
		<div class="auth-page-content">
			<Container>
				<Row>
					<Col lg={12}>
						<div class="text-center mt-sm-5 mb-4 text-white-50">
							<div>
								<Link href="/dashboard" class="d-inline-block auth-logo">
									<img src={logoLight} alt="" height="20" />
								</Link>
							</div>
							<p class="mt-3 fs-15 fw-medium">Welcome to Homepesa Club </p>
						</div>
					</Col>
				</Row>

				<Row class="justify-content-center">
					<Col md={8} lg={6} xl={5}>
						<Card class="mt-4">
							<CardBody class="p-4 text-center">
								<div class="avatar-lg mx-auto mt-2">
									<div class="avatar-title bg-light text-success display-3 rounded-circle">
										<i class="ri-checkbox-circle-fill" />
									</div>
								</div>
								<div class="mt-4 pt-2">
									<h4>Well done !</h4>
									<p class="text-muted mx-4">
										Aww yeah, you successfully read this important message.
									</p>
									<div class="mt-4">
										<Link
											href="/authenticationInner/login/auth-signin-basic"
											class="btn btn-success w-100">Back to Dashboard</Link
										>
									</div>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	</ParticlesAuth>
</div>
