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

	import QRCode from '../../../qrjs.svelte';

	import { page } from '$app/stores';
	import { server_url, server_nft_url } from '../../../stores.js';
	import { get } from 'svelte/store';

	let store_server_url = get(server_url);
	let store_nft_url = get(server_nft_url);
	const eventUUID = $page.url.searchParams.get('token');
	const userUUID = $page.url.searchParams.get('user_id');
	let eventTitle = $page.url.searchParams.get('event_title');
	//const qrCodeEvent = eventUUID + '_' + userUUID;
	const par_account_id = $page.url.searchParams.get('account_id');

	const par_event_id = $page.url.searchParams.get('event_id');
	const qrCodeEvent = "https://peerclub.peerplays.com/authenticationInner/successmessage/peerplays-nft-ops-qr-read?id="+ par_event_id + '&account_id=' + par_account_id;

	function loopFunction() {
		//console.log("merhaba");
	}
	//setInterval(loopFunction,3000);

	async function getNftMetadata() {
		const res = await fetch(store_nft_url + 'getnftfulldata', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nft_detail_id_start: '0',
				nft_detail_id_end: '9999999999',
				rec_limit: '10',
				start_date_time_epoch: '1671992077',
				end_date_time_epoch: '9999999999',
				account_id: '624',
				event_name_substr: ''
			})
		});

		const result_json = await res.json();
		let json_base_uri;

		console.log("titleeee__" + par_event_id);

		if(par_event_id == null){
			eventTitle = JSON.parse(result_json[result_json.length-1].token_uri_2).title;
			return;
		}

		  for (let i = 0; i < result_json.length; i++) {

        if (par_event_id == result_json[i].nft_metadata_id) {

            json_base_uri = JSON.parse(result_json[i].token_uri_2);

            eventTitle = json_base_uri.title;
			console.log("titleeee__" + eventTitle);
            
            //console.log("found:" + JSON.stringify(json_base_uri));
        }

    }
		
	}

	getNftMetadata();

	async function EventUsersJoin() {
		const res = await fetch(store_server_url + 'opsuserevent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_uuid: '81dbab0b-6a07-4aed-a298-078edfb5fa9c',
				event_uuid: '250be3c8-2006-4d1a-b5c3-36dfb4dd7041',
				is_admin: 'true',
				optype: 'join'
			})
		});

		const result_json = await res.json();

		const result_string = JSON.stringify(result_json);
		console.log('result: ' + result_json.result);
		if (result_json.result === 'ok') {
			//alert('Entrance Succeed.');
		}
	}

	//EventUsersJoin();
</script>

<svelte:head>
	<title>Event Qr Pass | Homepesa Mega Platform</title>
</svelte:head>

<div class="p-2">
	<Container fluid>
		<Row>
			<Col xs={12}>
				<Row>
					<Col xl={12}>
						<Card className="card-h-100">
							<CardBody class="d-flex justify-content-center">
								<div class="ticket inverse">
									<header>
										<div class="company-name">Homepesa Club Bunker Access</div>
										<div class="gate">
											<div>BLOCK A</div>
											<div>ANNEX 1</div>
										</div>
									</header>
									<section class="airports">
										<div class="airport">
											<div class="airport-name">{eventTitle}</div>
											<div class="dep-arr-label">Start Time</div>
											<div class="time">9:15am</div>
										</div>
									</section>
									<section class="place">
										<div class="place-block">
											<div class="place-label">Room</div>
											<div class="place-value">301</div>
										</div>

										<!--
										<div class="qr">
											<img src="http://www.classtools.net/QR/pics/qr.png" />
										</div>
										-->
										<div class="container qr">
											<QRCode codeValue={qrCodeEvent} squareSize="200" />
										</div>
									</section>
								</div>
								<!--
								<div class="ticket inverse">
									<header>
										<div class="company-name">American Airlines</div>
										<div class="gate">
											<div>Gate</div>
											<div>B4</div>
										</div>
									</header>
									<section class="airports">
										<div class="airport">
											<div class="airport-name">Charlotte</div>
											<div class="airport-code">CLT</div>
											<div class="dep-arr-label">Departing</div>
											<div class="time">7:45am</div>
										</div>
										<div class="airport">
											<div class="airport-name">Tampa</div>
											<div class="airport-code">TPA</div>
											<div class="dep-arr-label">Arriving</div>
											<div class="time">9:15am</div>
										</div>
									</section>
									<section class="place">
										<div class="place-block">
											<div class="place-label">Group</div>
											<div class="place-value">2</div>
										</div>
										<div class="place-block">
											<div class="place-label">Seat</div>
											<div class="place-value">2A</div>
										</div>
										<div class="place-block">
											<div class="place-label">Term</div>
											<div class="place-value">B</div>
										</div>
										<div class="qr">
											<img src="http://www.classtools.net/QR/pics/qr.png" />
										</div>
									</section>
								</div>
								-->
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Col>
		</Row>
	</Container>
</div>

<style>
	@import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css';
	body {
		text-align: center;
	}
	.ticket {
		display: inline-block;
		max-width: 350px;
		width: 100%;
		margin: 10px;
		background-color: #273138;
		border-radius: 10px;
		color: #fff;
		font-family: Helvetica Neue;
		font-weight: 300;
		letter-spacing: 1px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
	.ticket header {
		position: relative;
		height: 50px;
		background-color: #1b252e;
		padding: 10px;
		border-radius: 10px;
	}
	.ticket header .company-name {
		line-height: 35px;
		text-align: left;
	}
	.ticket header .gate {
		position: absolute;
		right: 15px;
		top: 10px;
		font-weight: 400;
		line-height: 18px;
		text-align: center;
		font-size: 12px;
	}
	.ticket header:after {
		content: '';
		width: 16px;
		height: 16px;
		background-color: #fff;
		position: absolute;
		bottom: -8px;
		right: -8px;
		border-radius: 50%;
		box-shadow: inset 12px 0px 18px -11px rgba(0, 0, 0, 0.5);
	}
	.ticket header:before {
		content: '';
		width: 16px;
		height: 16px;
		background-color: #fff;
		position: absolute;
		bottom: -8px;
		left: -8px;
		border-radius: 50%;
		box-shadow: inset -12px 0px 18px -11px rgba(0, 0, 0, 0.5);
	}
	.ticket .airports {
		padding: 5px 10px 10px 10px;
		height: 100px;
		text-align: center;
		position: relative;
		border-bottom: 2px dashed #000;
	}
	.ticket .airports .airport {
		position: relative;
		margin: 10px;
		text-align: center;
		display: inline-block;
	}
	.ticket .airports .airport .airport-name {
		color: #29a8eb;
		font-size: 12px;
		font-weight: 400;
	}
	.ticket .airports .airport .airport-code {
		font-size: 32px;
		font-weight: 400;
		margin: 5px 0;
	}
	.ticket .airports .airport .dep-arr-label {
		color: #9299a0;
		font-size: 12px;
		font-weight: 500;
	}
	.ticket .airports .airport .time {
		font-size: 10px;
		color: #9299a0;
	}
	.ticket .airports .airport:first-child {
		margin-right: 40%;
	}
	.ticket .airports .airport:first-child:after {
		font-family: FontAwesome;
		color: #353e48;
		content: '\f072';
		position: absolute;
		font-size: 55px;
		top: calc(50% - 25px);
		right: -150%;
	}
	.ticket .airports:after {
		content: '';
		width: 16px;
		height: 16px;
		background-color: #fff;
		position: absolute;
		bottom: -8px;
		right: -8px;
		border-radius: 50%;
		box-shadow: inset 12px 0px 18px -11px rgba(0, 0, 0, 0.5);
	}
	.ticket .airports:before {
		content: '';
		width: 16px;
		height: 16px;
		background-color: #fff;
		position: absolute;
		bottom: -8px;
		left: -8px;
		border-radius: 50%;
		box-shadow: inset -12px 0px 18px -11px rgba(0, 0, 0, 0.5);
	}
	.ticket .place {
		padding: 10px;
		text-align: center;
		height: 330px;
	}
	.ticket .place-block {
		display: inline-block;
		margin: 10px 30px;
	}
	.ticket .place-block .place-label {
		color: #29a8eb;
		text-transform: uppercase;
		font-weight: 400;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.ticket .place-block .place-value {
		color: #9299a0;
		font-size: 12px;
		font-weight: 500;
	}
	.ticket .qr {
		width: 220px;
		height: 220px;
		margin: 20px auto;
		border-radius: 10px;
		overflow: hidden;
	}
	.ticket .qr img {
		width: 100%;
		height: 100%;
	}
	.ticket.inverse {
		background-color: #f8f8f8;
	}
	.ticket.inverse header {
		background-color: #29a8eb;
	}
	.ticket.inverse .airports {
		border-bottom-color: #d3d6da;
	}
	.ticket.inverse .airport:first-child:after {
		color: #d3d6da;
	}
	.ticket.inverse .airport .airport-code {
		color: #707884;
		font-weight: 500;
	}
</style>
