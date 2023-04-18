<script>
	import {
		Card,
		CardBody,
		CardHeader,
		Col,
		Container,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Row,
		Collapse,
		Dropdown
	} from 'sveltestrap';
	import BreadCrumb from '../../../../Components/Common/BreadCrumb.svelte';
	import Link from 'svelte-link';
	import data from '../../../../common/data/NFTMarketplace';

	import QRCode from '../../../../qrjs2.svelte';
	import { server_url, server_nft_url } from '../../../../stores.js';
	import { get } from 'svelte/store';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let isOpen = false;
	let isOpenInvite = false;
	let store_server_url = get(server_url);
	let store_server_nft_url = get(server_nft_url);
	let dataEvents = [];
	let totalCount = 0;
	let arrEvents = [];

	let strSearch = "";

	onMount(async () => {
		getEventMetadata();
	});

	async function getEvents(arg1) {
		const res = await fetch(store_server_url + 'getuserevents', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});

		const result_json = await res.json();

		totalCount = result_json.length;
		dataEvents = result_json;
		data.expolreNow = result_json;
		const result_string = JSON.stringify(result_json);
		//console.log('result: ' + result_string);
		console.log(JSON.stringify(dataEvents));
	}

	async function getEventMetadata() {
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
		const result_string = JSON.stringify(result_json);
		arrEvents = [];

		for (let i = 0; i < result_json.length; i++) {
			if (JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined &&  JSON.parse(result_json[i].token_uri_2).prj_data_type == "PCL-NFM-1" && JSON.parse(result_json[i].token_uri_2).title != "Mint Test 1") {
				
				if(strSearch.length > 0) {
				
				let search_title = "" +JSON.parse(result_json[i].token_uri_2).title;
				
				if(search_title.toLowerCase().includes(strSearch)) {

				console.log("found");
				arrEvents.push(JSON.parse(result_json[i].token_uri_2));

					}
				}
				else {
				arrEvents.push(JSON.parse(result_json[i].token_uri_2));

				}
				//console.log(JSON.parse(result_json[i].token_uri_2));
				//dataEvents.push(JSON.parse(result_json[i].token_uri_2));
				
			}
		}
		totalCount = result_json.length;
		dataEvents = arrEvents;
		//dataEvents = [{"allDay":"f","className":"bg-soft-dark text-white","description":"Crypto Conferance meeting 1","end":"2022-11-30 00:00:00","extendedProps":"","id":"977aab96-3e95-4064-bf9f-caf3c4913c37","image_url":"3","location":"BUNKER","start":"2022-11-30 00:00:00","title":"Crypto Conferance 2"},{"allDay":"f","className":" text-white","description":"test 223","end":"2022-11-30 00:00:00","extendedProps":"","id":"19847969-fbed-4888-965d-157da18e2e74","image_url":"22","location":"BUNKER","start":"2022-11-30 00:00:00","title":"test 23"},{"allDay":"f","className":"bg-soft-primary text-white","description":"Coding 1","end":"2022-11-30 00:00:00","extendedProps":"","id":"63e0a69b-5511-459b-a49d-f62dc1525bd9","image_url":"1","location":"BUNKER","start":"2022-11-30 00:00:00","title":"Baris 1"},{"allDay":"f","className":"bg-soft-danger text-white","description":"laser tag game","end":"2022-12-02 00:00:00","extendedProps":"","id":"08590ff2-3e6c-4b3e-aa70-b450598823f8","image_url":"2","location":"BUNKER","start":"2022-12-02 00:00:00","title":"Laser Tag Game 1"},{"allDay":"f","className":"bg-soft-primary text-white","description":"test event meeting 2","end":"2022-12-03 00:00:00","extendedProps":"","id":"250be3c8-2006-4d1a-b5c3-36dfb4dd7041","image_url":"4","location":"BUNKER","start":"2022-12-03 00:00:00","title":"Test Event 2"},{"allDay":"f","className":"bg-soft-warning text-white","description":"testt 1 desc","end":"2022-12-05 23:40:00","extendedProps":"","id":"d87c3020-f110-4b8b-ac45-6b1136a41539","image_url":"img1","location":"BUNKER","start":"2022-12-05 23:40:00","title":"test 1"},{"allDay":"f","className":"bg-soft-primary text-white","description":"even desc 2","end":"2022-12-15 00:00:00","extendedProps":"","id":"0f62af96-7eac-4a6e-8c37-039b79b416c8","image_url":"","location":"BUNKER","start":"2022-12-15 00:00:00","title":"event preview 2"},{"allDay":"f","className":"bg-soft-info text-white","description":"event dev desc 2","end":"2022-12-17 00:00:00","extendedProps":"","id":"4db2fcb9-3466-4407-bc85-98301b43486f","image_url":"","location":"BUNKER","start":"2022-12-17 00:00:00","title":"event dev 2"}]
		//console.log(JSON.stringify(dataEvents));

	}

	//getEvents('');
	//getEventMetadata();

	const toggleInvite = () => {
		isOpenInvite = !isOpenInvite;
		if (!isOpenInvite) {
			setTimeout(() => {
				//isedit = false;
			}, 500);
		}
	};

	async function showDetails(event_uuid) {
		goto('/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id=' + event_uuid);
	}

	const getFilteredEvents = e => {
    if (e.charCode === 13) getEventMetadata();
  };
</script>

<svelte:head>
	<title>Explore Now | Homepesa Mega Platform</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Explore Now" pageTitle="Marketplace" />
		<Row>
			<Col lg={12}>
				<Card>
					<CardHeader class="border-0">
						<div class="d-flex align-items-center">
							<h5 class="card-title mb-0 flex-grow-1">Explore Events</h5>
							<div>
								<Link
									class="btn btn-success"
									id="filtercollapse"
									data-bs-toggle="collapse"
									href="#collapseExample"
									on:click={() => (isOpen = !isOpen)}
								>
									<i class="ri-filter-2-line align-bottom" />
									Filters
								</Link>
							</div>
						</div>

						<Collapse {isOpen}>
							<Row class="row-cols-xxl-5 row-cols-lg-3 row-cols-md-2 row-cols-1 mt-3 g-3">
								<Col>
									<h6 class="text-uppercase fs-12 mb-2">Search</h6>

									<input
										type="text"
										class="form-control"
										placeholder="Search by keyword"
										autoComplete="off"
										id="searchProductList"
										on:keypress={getFilteredEvents}
										bind:value={strSearch}
									/>
								</Col>
								<Col>
									<h6 class="text-uppercase fs-12 mb-2">Select Event Start Time</h6>
									<input
										type="datetime-local"
										class="form-control"
										name="start"
										placeholder="Event Time"
									/>
								</Col>

								<Col>
									<h6 class="text-uppercase fs-12 mb-2">Sales Type</h6>
									<select
										class="form-control"
										data-choices
										name="all-sales-type"
										data-choices-search-false
										id="all-sales-type"
									>
										<option value="">All Sales Type</option>
										<option value="On Auction">On Auction</option>
										<option value="Has Offers">Has Offers</option>
									</select>
								</Col>
							</Row>
						</Collapse>
					</CardHeader>
				</Card>
			</Col>
			<Col lg={12}>
				<div class="d-flex align-items-center mb-4">
					<div class="flex-grow-1">
						<p class="text-muted fs-15 mb-0">Result: {totalCount}</p>
					</div>
					<div class="flex-shrink-0">
						<Dropdown>
							<DropdownToggle tag="a" class="fs-14" role="button">
								All View <i class="mdi mdi-chevron-down" />
							</DropdownToggle>
							<DropdownMenu class="dropdown-menu-end">
								<DropdownItem href="">All</DropdownItem>
								<DropdownItem href="">Newest</DropdownItem>
								<DropdownItem href="">Old</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</Col>
		</Row>
		<Row
			class="row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1"
			id="explorecard-list"
		>
			{#each dataEvents as item}
				<Col class="list-element">
					<Card class="explore-box card-animate">
						<div class="explore-place-bid-img">
							<input type="hidden" class="form-control" id="1" />
							<div class="d-none">undefined</div>
							<QRCode
								codeValue="https://peerclub.peerplays.com/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id={item.id}"
								squareSize="200"
								divId={item.id}
							/>

							<!--
							<img
								src="/src/assets/images/companies/img-1.png"
								alt=""
								class="card-img-top explore-img"
							/>
							-->
							<div class="bg-overlay" />
							<div class="place-bid-btn">
								<Link href="#!" class="btn btn-success" on:click={showDetails(item.id)}>
									<i class="mdi mdi-account-multiple-plus align-bottom me-1" /> Show Detail
								</Link>
							</div>
						</div>
						<!--
						<div class="bookmark-icon position-absolute top-0 end-0 p-2">
							<button
								type="button"
								class="btn btn-icon"
								data-bs-toggle="button"
								aria-pressed="true"
							>
								<i class="mdi mdi-cards-heart fs-16" />
							</button>
						</div>
						-->
						<CardBody>
							<p class="fw-medium mb-0 float-end">
								<i class="mdi mdi-account-arrow-up text-danger align-middle" />{' '}
								256
							</p>
							<h5 class="mb-1">
								<Link href="/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id={item.id}"
									>{item.title}</Link
								>
							</h5>
							<p class="text-muted mb-0">{item.location}</p>
						</CardBody>
						<div class="card-footer border-top border-top-dashed">
							<div class="d-flex align-items-center">
								<div class="flex-grow-1 fs-14">
									<i class="ri-price-tag-3-fill text-warning align-bottom me-1" />
									Highest: <span class="fw-medium">1 KSH</span>
								</div>
								<h5 class="flex-shrink-0 fs-14 text-primary mb-0">2 KSH</h5>
							</div>
						</div>
					</Card>
				</Col>
			{/each}
		</Row>
		<div class="py-4 text-center" id="noresult" style="display: none">
			<lord-icon
				src="https://cdn.lordicon.com/msoeawqm.json"
				trigger="loop"
				colors="primary:#405189,secondary:#0ab39c"
				style="width: 72px; height: 72px;"
			/>
			<h5 class="mt-4">Sorry! No Result Found</h5>
		</div>
		<div class="text-center mb-3">
			<button class="btn btn-link text-success mt-2" id="loadmore">
				<i class="mdi mdi-loading mdi-spin fs-20 align-middle me-2" />
				Load More
			</button>
		</div>
	</Container>
</div>
