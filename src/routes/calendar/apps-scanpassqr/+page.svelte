<script>
	import {
		Card,
		CardBody,
		Container,
		Modal,
		ModalBody,
		ModalHeader,
		Row,
		Col,
		Label
	} from 'sveltestrap';



	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';

	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';
	import { server_url } from '../../../stores.js';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	

	let scanning = false;

	let html5Qrcode;
	let store_server_url = get(server_url);

	//let isRead = false;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		//EventUsersJoin("08590ff2-3e6c-4b3e-aa70-b450598823f8","78488888-3284-4398-aff7-56a68ca0a0e3");
	}

	

	function start() {
		
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
		

	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText, decodedResult) {
		//alert(`Code matched = ${decodedText}`);
		//alert(`QR Fetch code for the event read successfully. Entrance allowed for the user`);
		//alert(`DECODED Result: ${decodedText}`);
		//console.log("decoded text: " + decodedText);

		//const qrcodeArray = decodedText.split('_');

		//EventUsersJoin(qrcodeArray[0], qrcodeArray[1]);
		goto(decodedText);
	}

	function onScanFailure(error) {
		console.warn(`Code scan error = ${error}`);
	}

	async function EventUsersJoin(arg_event_uuid, arg_user_uuid) {
		//alert("ids: user: " + arg_user_uuid + "_______ event:" + arg_event_uuid);
		const res = await fetch(store_server_url + 'opsuserevent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_uuid: arg_user_uuid,
				event_uuid: arg_event_uuid,
				is_admin: 'true',
				optype: 'join'
			})
		});

		const result_json = await res.json();

		const result_string = JSON.stringify(result_json);
		//console.log('result: ' + result_json.result);
		//alert('result: ' + result_string);
		if (result_json.result === 'ok') {
			//alert('Entrance Succeed.');
			alert(`QR Fetch code for the event read successfully. Entrance allowed for the user`);
		}
	}
</script>

<svelte:head>
	<title>Scan Pass Qr | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	

	<Container fluid>
		<BreadCrumb title="Event Entrance" pageTitle="Apps" />
		<Row>
			<Col xs={12}>
				<Row>
					<Col xl={12}>
						<Card className="card-h-100">
							<CardBody>
								<main>
									<reader id="reader" />
									{#if scanning}
										<button on:click={stop}>stop</button>
									{:else}
										<button on:click={start}>start</button>
									{/if}
								</main>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	</Container>
</div>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	reader {
		width: 100%;
		min-height: 500px;
		background-color: black;
	}
</style>
