<script>
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
	import { server_nft_url, server_sso_url, server_url, server_sso_api_key } from '../../stores.js';

	let store_server_url = get(server_url);
	let store_server_sso_api_key = get(server_sso_api_key);
	let store_server_nft_url = get(server_nft_url);
	let store_server_sso__url = get(server_sso_url);
	let peerclubEvents = [];
	let activeTab = 1;
	let modal_event_id = '';
	let modal_event_title = '';

	import { saved_name } from '../../stores.js';
	let store_glb_username = '';

	saved_name.subscribe((value) => (store_glb_username = value));

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
			if (JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined) {
				arrEvents.push(JSON.parse(result_json[i].token_uri_2));
				console.log(JSON.stringify(JSON.parse(result_json[i].token_uri_2).invited));
			}
			//console.log(JSON.parse(result_json[i].token_uri_2).invited);
		}

		peerclubEvents = arrEvents;
	}

	getEventMetadata();

	async function getEventMetadataDetails(event_metadata_id) {
		//peerclubEvents = null;

		arrEventDetailsInvited = [];
		arrEventDetailsReplied = [];
		arrEventDetailsParticipation = [];

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
		//console.log('result_data_size: ' + result_json.length);

		let arrEvents = [];
		let arrEventsReplied = [];
		let arrEventsParticipation = [];
		//let eventObj = JSON.parse(result_json[28].token_uri_2);
		//arrEvents.push(eventObj);

		for (let i = 0; i < result_json.length; i++) {
			if (event_metadata_id == result_json[i].nft_metadata_id) {
				let invited = JSON.parse(result_json[i].token_uri_2).invited;
				modal_event_title = JSON.parse(result_json[i].token_uri_2).title;

				for (let j = 0; j < invited.length; j++) {
					//console.log(invited[j]);
					arrEvents.push(invited[j]);
				}

				let replied = JSON.parse(result_json[i].token_uri_2).replied;
				for (let k = 0; k < replied.length; k++) {
					arrEventsReplied.push(replied[k]);
				}

				let participation = JSON.parse(result_json[i].token_uri_2).participation;
				for (let l = 0; l < participation.length; l++) {
					arrEventsParticipation.push(participation[l]);
				}
			}

			//console.log(JSON.parse(result_json[i].token_uri_2).invited);
		}

		arrEventDetailsInvited = arrEvents;
		arrEventDetailsReplied = arrEventsReplied;
		arrEventDetailsParticipation = arrEventsParticipation;
	}

	async function getUserDetails(account_name) {
		//peerclubEvents = null;

		const res = await fetch(store_server_sso__url + 'user/' + account_name, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': store_server_sso_api_key
			}
		});

		const result_json = await res.json();
		console.log('user_email: ' + result_json.email);

		sendTicket(result_json.email, account_name);
	}

	async function sendTicket(email, account_name) {
		const res = await fetch(store_server_url + 'sendQrPass', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_uuid: account_name,
				event_id: modal_event_id,
				event_title: modal_event_title,
				email: email,
				admin_username: store_glb_username
			})
		});

		const result_json = await res.json();
		console.log(JSON.stringify(result_json));
		alert('Ticket Sent to User.!');
	}

	function actionAlert() {
		alert('To be implemented.!');
	}

	const toggle = (id) => {
		isOpen = !isOpen;

		if (isOpen) {
			getEventMetadataDetails(id);
			modal_event_id = id;
		}

		if (!isOpen) {
			setTimeout(() => {
				//
			}, 500);
		}
	};
</script>

<Row>
	<Col xxl={6}>
		<Card>
			<CardHeader class="align-items-center d-flex">
				<h4 class="card-title mb-0 flex-grow-1">Recent Events</h4>
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
								<th>Event Name</th>
								<th>Start Date</th>
								<th>24h %</th>
								<th>Creators</th>
								<th>Tickets</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each peerclubEvents as item}
								<tr>
									<td>
										<div class="d-flex align-items-center">
											<div class="me-2">
												<Avatar size="36px" bgColor="#7084c7" name={item.title} />
											</div>
											<div class="flex-grow-1">
												<h6 class="mb-1">
													<Link
														href="/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id={item.id}"
														class="link-dark">{item.title}</Link
													>
												</h6>
												<p class="text-muted mb-0">
													{item.id}
												</p>
											</div>
										</div>
									</td>
									<td>{item.start}</td>
									<td>
										<span class={item.textColor ? 'text-danger mb-0' : 'text-success mb-0'}
											><i class="mdi mdi-trending-up align-middle me-1" />{item.id}
										</span>
									</td>
									<td>{store_glb_username}</td>
									<td>{item.id}</td>
									<td>
										<button class="btn btn-secondary" on:click={toggle(item.id)}
											><i class="mdi mdi-eye align-middle me-1" />Detail</button
										>
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

<Modal {isOpen} contentClassName="modal-detail-size1" fullscreen="true">
	<ModalHeader {toggle} tag="h4">Event Details</ModalHeader>
	<ModalBody>
		<Row>
			<Col class="col-12">
				<Card class="mt-xxl-n5">
					<CardHeader>
						<Nav class="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
							<NavItem>
								<NavLink class="fs-14" on:click={() => (activeTab = 1)} active={activeTab == 1}>
									<i class="fas fa-home" />
									Invited
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href={null} on:click={() => (activeTab = 2)} active={activeTab == 2}>
									<i class="far fa-user" />
									Replied
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href={null} on:click={() => (activeTab = 3)} active={activeTab == 3}>
									<i class="far fa-envelope" />
									Participation
								</NavLink>
							</NavItem>
						</Nav>
					</CardHeader>
					<CardBody class="p-3">
						<TabContent>
							<TabPane tabId={1} class={activeTab == 1 ? 'active' : ''}>
								<div class="table-responsive table-card">
									<table
										class="table table-borderless table-centered align-middle table-nowrap mb-0"
									>
										<thead class="text-muted bg-soft-light">
											<tr>
												<th>Account Id</th>
												<th>Status</th>
												<th>Inv. Date</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{#each arrEventDetailsInvited as item}
												<tr>
													<td>{item.account_id}</td>
													<td>{item.invitation_sent}</td>
													<td>{item.invitation_dt}</td>
													<td>
														<button class="btn btn-secondary"
															><i class="mdi mdi-eye align-middle me-1" />Action</button
														>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</TabPane>

							<TabPane tabId={2} class={activeTab == 2 ? 'active' : ''}>
								<div class="table-responsive table-card">
									<table
										class="table table-borderless table-centered align-middle table-nowrap mb-0"
									>
										<thead class="text-muted bg-soft-light">
											<tr>
												<th>Account Id</th>
												<th>Status</th>
												<th>Reply Date</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{#each arrEventDetailsReplied as item}
												<tr>
													<td>{item.account_id}</td>
													<td>{item.status}</td>
													<td>{item.reply_dt}</td>
													<td>
														<button
															class="btn btn-secondary"
															on:click={getUserDetails(item.account_id)}
															><i class="mdi mdi-eye align-middle me-1" />Send Ticket</button
														>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</TabPane>

							<TabPane tabId={3} class={activeTab == 3 ? 'active' : ''}>
								<div class="table-responsive table-card">
									<table
										class="table table-borderless table-centered align-middle table-nowrap mb-0"
									>
										<thead class="text-muted bg-soft-light">
											<tr>
												<th>Account Id</th>
												<th>Status</th>
												<th>Part. Date</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{#each arrEventDetailsParticipation as item}
												<tr>
													<td>{item.account_id}</td>
													<td>{item.prt_status}</td>
													<td>{item.prt_dt}</td>
													<td>
														<button class="btn btn-secondary" on:click={actionAlert}
															><i class="mdi mdi-eye align-middle me-1" />Action</button
														>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</TabPane>
						</TabContent>
					</CardBody>
				</Card>
			</Col>
		</Row>
		<Row class="mt-2">
			<Col xs="12" class="text-end">
				<button type="button" class="btn btn-light mx-2" on:click={toggle}> Close </button>
			</Col>
		</Row>
	</ModalBody>
</Modal>

<style>
	.test1234 {
		width: 600px;
	}
</style>
