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
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';
	import Link from 'svelte-link';
	import data from '../../../common/data/NFTMarketplace';

	import QRCode from '../../../qrjs2.svelte';
	import { server_url } from '../../../stores.js';
	import { get } from 'svelte/store';

	import { goto } from '$app/navigation';


	let isOpen = true;
	let isOpenInvite = false;
	let store_server_url = get(server_url);
	let dataEvents = [];
	let totalCount = 0;

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
	}

	getEvents('');

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
</script>

<svelte:head>
	<title>Explore Now | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Explore Now" pageTitle="NFT Marketplace" />
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
								<Link
									href="#!"
									class="btn btn-success"
									on:click={showDetails(item.id)}
								>
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
