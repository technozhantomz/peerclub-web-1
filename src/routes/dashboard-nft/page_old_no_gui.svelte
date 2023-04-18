<script>
	import { Col, Container, Row } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import Widgets from './Widgets.svelte';
	import Marketplace from './Marketplace.svelte';
	import Popularity from './Popularity.svelte';
	import FeaturedNFT from './FeaturedNFT.svelte';
	import RecentNFTs from './RecentNFTs.svelte';


	//import { Apis } from 'peerplaysjs-lib/dist/index.js';
	
	//import { Apis } from 'bitsharesjs-ws';
	/*import {
		ChainStore,
		FetchChain,
		PrivateKey,
		TransactionHelper,
		Aes,
		TransactionBuilder
	} 
	from 'peerplaysjs-lib/dist/index.js'; */
	//from 'bitsharesjs';
	
	 
/*
	function testConnect() {
		var witness_node = 'ws://mint.peerplays.download:8090';

		Apis.instance(witness_node, true).init_promise.then((res) => {
			console.log('YESS CONNECTED NOW!!! connected to:', res[0].network);
		});
	}
	*/

	/*
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

*/

/*
	function createNFTMetadata() {
		//	var nobroadcast = false;
		var amount_to_send = 600000;
		var asset_to_send = 'TEST';
		var from_account = 'baris801';
		var to_account = 'baris802';
		var memo_text = 'Your memo goes in here..';

		let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
		let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

		Apis.instance(witness_node, true).init_promise.then((res) => {
			console.log('connected to:', res[0].network);

			ChainStore.init().then(() => {
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
	

	/*
	    {
		fee: asset,
		owner: protocol_id_type('account'),
		name: string,
		symbol: string,
		base_uri: string,
		revenue_partner: optional(protocol_id_type('account')),
		revenue_split: optional(uint16),
		is_transferable: bool,
		is_sellable: bool,
		account_role: optional(protocol_id_type('account_role')),
		extensions: set(future_extensions)
		} 
	*/

	/*
	function createNFT() {
		let pKeyActive = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Active Private Key
		let pKeyMemo = PrivateKey.fromWif('5JTdY1Pw6bbEeMUKLxNRyfkgqdNAAoi2ZhbCPfLc4KV9ncQs4Af'); // Replace with your own Memo Private Key

		Apis.instance(witness_node, true).init_promise.then((res) => {
			console.log('connected to:', res[0].network);

			let tr = new TransactionBuilder();
			tr.add_type_operation('nft_metadata_create', {
				fee: {
					amount: 0,
					asset_id: '1.3.0'
				},
				owner: '1.2.623',
				name: 'barisnft1',
				symbol: 'barisnft1',
				base_uri: 'http://baris.peerplays.com',
				//revenue_partner: optional(protocol_id_type('account')),
				//revenue_split: optional(uint16),
				is_transferable: true,
				is_sellable: true,
				//account_role: optional(protocol_id_type('account_role')),
				extensions: {}

				
				//account: '1.2.680',
				
				//target_type: 1,
				//amount: {
				//	amount: 1,
				//	asset_id: '1.3.0'
				//},
				//extensions: {}
				
			});
			tr.set_required_fees().then(() => {
				tr.add_signer(pKeyActive, pKeyActive.toPublicKey().toPublicKeyString());
				console.log('serialized transaction:', tr.serialize().operations);
				tr.broadcast()
					.then(() => {
						console.log('NFT Broadcast success!');
					})
					.catch((err) => {
						console.error(err);
					});
			});
		});
	}
	*/


//	testConnect();
	//testTransfer();
</script>

<svelte:head>
	<title>NFT Membership | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Peer Club Dashboard" pageTitle="Dashboard" />
		<Row class="dash-nft">
			<Col xxl={9}>
				<Widgets />
				<Marketplace />
			</Col>
			<Popularity />
		</Row>
		<FeaturedNFT />
		<RecentNFTs />
	</Container>
</div>
