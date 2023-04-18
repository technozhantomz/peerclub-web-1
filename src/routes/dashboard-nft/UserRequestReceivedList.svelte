<script>
	import { user_private_key } from './../../stores.js';
	import {
		Card,
		CardBody,
		CardHeader,
		Col,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Row,
		Dropdown,
		Modal,
		ModalBody,
		ModalHeader,
		Label,
		Nav,
		NavItem,
		NavLink,
		TabContent,
		TabPane
	} from 'sveltestrap';
	import data from '../../common/data/dashboardNFT';
	// Import Images
	import usFlag from '../../assets/images/flags/us.svg';
	import russiaFlag from '../../assets/images/flags/russia.svg';
	import spainFlag from '../../assets/images/flags/spain.svg';
	import italyFlag from '../../assets/images/flags/italy.svg';
	import germanyFlag from '../../assets/images/flags/germany.svg';

	// Swiper
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'swiper/css/navigation';
	import { Pagination, Navigation, Autoplay } from 'swiper';
	import Link from 'svelte-link';
	import Map from '../../Components/Common/Map.svelte';

	import Avatar from 'svelte-avatar';
	import { get } from 'svelte/store';
	import {
		account_id,
		server_nft_url,
		server_sso_url,
		server_url,
		server_sso_api_key
		
	} from '../../stores.js';
	import { goto } from '$app/navigation';

	let store_server_url = get(server_url);
	let store_server_sso_api_key = get(server_sso_api_key);
	let store_server_nft_url = get(server_nft_url);
	let store_server_sso__url = get(server_sso_url);
	let peerclubEvents = [];
	let activeTab = 1;
	let modal_event_id = '';
	let modal_event_title = '';
	let par_account_id;

	let par_from_id ="";
	let par_to_id = "";
	let par_mint_id = "";
	let par_req_uuid = "";

	let store_user_private_key = '';
	let isPrivateKEy = false;
	user_private_key.subscribe((value) => (store_user_private_key = value));


	import { saved_name } from '../../stores.js';
	let store_glb_username = '';

	saved_name.subscribe((value) => (store_glb_username = value));
	account_id.subscribe((value) => (par_account_id = value));

	let isOpen = false;
	let arrEventDetails = [];
	let arrEventDetailsInvited = [];
	let arrEventDetailsReplied = [];
	let arrEventDetailsParticipation = [];

	async function getEventMetadata() {
		//peerclubEvents = null;

		const res = await fetch(store_server_nft_url + 'getnftfulldata', {
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
		console.log('result_data_size: ' + result_json.length);

		let arrEvents = [];
		//let eventObj = JSON.parse(result_json[28].token_uri_2);
		//arrEvents.push(eventObj);

		for (let i = 0; i < result_json.length; i++) {
			if (
				JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined &&
				JSON.parse(result_json[i].token_uri_2).prj_data_type == 'PCL-SLS-1'
			) {
				for (let j = 0; j < JSON.parse(result_json[i].token_uri_2).requests.length; j++) {
					if (JSON.parse(result_json[i].token_uri_2).requests[j].from == par_account_id) {
						const result_find = result_json.filter(function (data) {
							return (
								data.nft_metadata_id ==
								JSON.parse(result_json[i].token_uri_2).requests[j].metadata_id
							);
						});
						let jsobjRequests = JSON.parse(result_json[i].token_uri_2).requests[j];
						jsobjRequests = {
							...jsobjRequests,
							title: JSON.parse(result_find[0].token_uri_2).title
						};
						//console.log("QQ"+JSON.stringify(jsobjRequests));
						arrEvents.push(jsobjRequests);
						//console.log("QQQQQ" +JSON.stringify(JSON.parse(result_json[i].token_uri_2).requests[j]));
					}
				}
			}
			//console.log(JSON.parse(result_json[i].token_uri_2).invited);
		}

		peerclubEvents = arrEvents;
	}

	getEventMetadata();

	function actionAlert() {
		alert('To be implemented.!');
	}

	const toggle = (id) => {
		isOpen = !isOpen;

		if (isOpen) {
			//getEventMetadataDetails(id);
			//modal_event_id = id;
		}

		if (!isOpen) {
			setTimeout(() => {
				//
			}, 500);
		}
	};

	const togglePrvKey = (to,mint_id,req_uuid) => {
		isPrivateKEy = !isPrivateKEy;
		par_to_id = to;
		par_mint_id = mint_id;
		par_req_uuid = req_uuid;
		console.log("" + req_uuid );
	};

function setPrivateKeyAndContinue() {
		//
		//user_private_key.set(store_user_private_key);
		//$user_private_key = store_user_private_key;
		document.cookie = "ses2=" + store_user_private_key +"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None;  path=/; Secure";
		let url_params = '?from=' + par_account_id;
		url_params = url_params + '&to=' + par_to_id;
		url_params = url_params + '&mint_id=' + par_mint_id;
		url_params = url_params + '&req_id=' + par_req_uuid;

		let  transfer_url_to_go = "/authenticationInner/successmessage/peerplays-nft-ops-transfer" + url_params;
		console.log(transfer_url_to_go);
		goto(transfer_url_to_go);
	}

</script>

<Row>
	<Col xxl={6}>
		<Card>
			<CardHeader class="align-items-center d-flex">
				<h4 class="card-title mb-0 flex-grow-1">Incoming Buy Requests</h4>
				<div class="flex-shrink-0">
					<Dropdown class="card-header-dropdown">
						<DropdownToggle tag="a" class="text-reset dropdown-btn p-0" role="button" color="">
							<span class="fw-semibold text-uppercase fs-12">Sort by: </span><span
								class="text-muted">Popular <i class="mdi mdi-chevron-down ms-1" /></span
							>
						</DropdownToggle>
						<DropdownMenu class="dropdown-menu-end" end>
							<DropdownItem to="">Popular</DropdownItem>
							<DropdownItem to="">Newest</DropdownItem>
							<DropdownItem to="">Oldest</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</CardHeader>
			<CardBody>
				<div class="table-responsive table-card">
					<table class="table table-borderless table-centered align-middle table-nowrap mb-0">
						<thead class="text-muted bg-soft-light">
							<tr>
								<th>User Name</th>
								<th>Request Date</th>
								<th>Status</th>
								<th>Event Name</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each peerclubEvents as item}
								<tr>
									<td>
										<div class="d-flex align-items-center">
											<div class="me-2">
												<Avatar size="36px" bgColor="#7084c7" name={item.to} />
											</div>
											<div class="flex-grow-1">
												<h6 class="mb-1">
													<!--<Link
														href="/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id={item.id}"
														class="link-dark">{item.to}</Link
													>
													-->
												</h6>
												<p class="text-muted mb-0">
													{item.to}
												</p>
											</div>
										</div>
									</td>
									<td>{item.req_dt}</td>
									<td>
										<span class={item.status == '0' ? 'text-warning mb-0' : 'text-success mb-0'}
											>{item.status == '0'
												? 'waiting'
												: 'success'}
										</span>
									</td>
									<td>{item.title}</td>
									<td>
									{#if item.status == "0"}
										<button class="btn btn-secondary" on:click={togglePrvKey(item.to,item.mint_id,item.req_id)}
											><i class="mdi mdi-eye align-middle me-1" />Approve</button
										>
									{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</CardBody>
		</Card>
	</Col>
</Row>

<Modal contentClassName="p-2" isOpen={isPrivateKEy}>
	<ModalHeader tag="h4">Private Key Setting</ModalHeader>
	<ModalBody>
		<Row>
			<Col class="col-12">
				<div class="mb-3">
					<Label class="form-label" for="title">Private Key</Label>

					<input
						type="text"
						class="form-control"
						name="prv_key"
						placeholder="Please Enter Private Key"
						bind:value={store_user_private_key}
					/>
				</div>
			</Col>
		</Row>
		<Row class="mt-2">
			<Col xs="12" class="text-end">
				<button
					type="button"
					class="btn btn-light me-2"
					on:click={() => (isPrivateKEy = !isPrivateKEy)}
				>
					Close
				</button>

				<button
					type="submit"
					class="btn btn-success save-event"
					on:click={setPrivateKeyAndContinue}
				>
					Save and Continue
				</button>
			</Col>
		</Row>
	</ModalBody>
</Modal>




<style>
	.test1234 {
		width: 600px;
	}
</style>
