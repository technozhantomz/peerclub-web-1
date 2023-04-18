<script>
	import { Container, Row } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';

	import BalanceOverview from './BalanceOverview.svelte';
	import ClosingDeals from './ClosingDeals.svelte';
	import DealsStatus from './DealsStatus.svelte';
	import DealType from './DealType.svelte';
	import MyTasks from './MyTasks.svelte';
	import SalesForecast from './SalesForecast.svelte';
	import UpcomingActivities from './UpcomingActivities.svelte';
	import Widgets from './Widgets.svelte';
	import Counter from '../../Components/Common/counter.svelte';

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

	function testTransfer() {
		var witness_node = 'ws://mint.peerplays.download:8090';
		var nobroadcast = false;
		var amount_to_send = 10000;
		var asset_to_send = 'TEST';
		var from_account = 'bob';
		var to_account = 'alice';
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

	testConnect();
	
</script>

<svelte:head>
	<title>CRM | Peer Club Dashboard</title>
</svelte:head>
<Counter />
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="CRM" pageTitle="Dashboards" />
		<Row>
			<Widgets />
		</Row>
		<Row>
			<SalesForecast />
			<DealType />
			<BalanceOverview />
		</Row>
		<Row>
			<DealsStatus />
			<MyTasks />
		</Row>
		<Row>
			<UpcomingActivities />
			<ClosingDeals />
		</Row>
	</Container>
</div>
