<script>
	import { CardBody, CardHeader, Container, Card, Row, Col } from 'sveltestrap';
	import Select from 'svelte-select';
	import Link from 'svelte-link';
	import SellerChats from './SellerChats.svelte';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';

	const optionvisibility = [
		{ value: 'Select Categories', label: 'Select Categories' },
		{ value: 'All', label: 'All' },
		{ value: 'Retailer', label: 'Retailer' },
		{ value: 'Health & Medicine', label: 'Health & Medicine' },
		{ value: 'Manufacturer', label: 'Manufacturer' },
		{ value: 'Food Service', label: 'Food Service' },
		{ value: 'Computers & Electronics', label: 'Computers & Electronics' }
	];

	import ecommerceData from '../../common/data/ecommerce';
</script>

<svelte:head>
	<title>Sellers | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Sellers" pageTitle="Ecommerce" />
		<Card>
			<CardHeader class="border-0 rounded">
				<Row class="g-2">
					<Col xl={3}>
						<div class="search-box">
							<input
								type="text"
								class="form-control search"
								placeholder="Search for sellers & owner name or something..."
							/> <i class="ri-search-line search-icon" />
						</div>
					</Col><!--end col-->
					<Col xl={2} class="ms-auto">
						<div class="select-single">
							<Select
								class="form-control"
								items={optionvisibility}
								placeholder="Select Categories"
							/>
						</div>
					</Col><!--end col-->
					<div class="col-lg-auto">
						<div class="hstack gap-2">
							<button type="button" class="btn btn-danger"
								><i class="ri-equalizer-fill me-1 align-bottom" /> Filters</button
							>
							<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addSeller"
								><i class="ri-add-fill me-1 align-bottom" /> Add Seller</button
							>
						</div>
					</div>
					<!--end col-->
				</Row><!--end row-->
			</CardHeader>
		</Card>

		<Row class="mt-4">
			{#each ecommerceData.sellersList as seller}
				<Col xl={3} lg={6}>
					<Card class="ribbon-box right overflow-hidden">
						<CardBody class="text-center p-4">
							{#if seller.isTrending}
								<div class="ribbon ribbon-info ribbon-shape trending-ribbon">
									<i class="ri-flashlight-fill text-white align-bottom" />
									<span class="trending-ribbon-text">Trending</span>
								</div>
							{/if}

							<img src={seller.img} alt="" height="45" />
							<h5 class="mb-1 mt-4">
								<Link href="/ecommerce/apps-ecommerce-seller-details" class="link-primary"
									>{seller.label}</Link
								>
							</h5>
							<p class="text-muted mb-4">{seller.name}</p>
							<Row class="justify-content-center">
								<div class="col-lg-8">
									<SellerChats color={seller.color} id={seller.id} data={seller.chartdata} />
								</div>
							</Row>
							<Row class="mt-4">
								<div class="col-lg-6 border-end-dashed border-end">
									<h5>{seller.stock}</h5>
									<span class="text-muted">Item Stock</span>
								</div>
								<div class="col-lg-6">
									<h5>{seller.balance}</h5>
									<span class="text-muted">Wallet Balance</span>
								</div>
							</Row>
							<div class="mt-4">
								<Link href="/ecommerce/apps-ecommerce-seller-details" class="btn btn-light w-100"
									>View Details</Link
								>
							</div>
						</CardBody>
					</Card>
				</Col>
			{/each}
		</Row>

		<Row class="g-0 text-center text-sm-start align-items-center mb-3">
			<div class="col-sm-6">
				<div>
					<p class="mb-sm-0">Showing 1 to 8 of 12 entries</p>
				</div>
			</div>
			<!-- end col -->
			<div class="col-sm-6">
				<ul
					class="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0"
				>
					<li class="page-item disabled">
						<Link href={null} class="page-link"><i class="mdi mdi-chevron-left" /></Link>
					</li>
					<li class="page-item active"><Link href={null} class="page-link">1</Link></li>
					<li class="page-item "><Link href={null} class="page-link">2</Link></li>
					<li class="page-item"><Link href={null} class="page-link">3</Link></li>
					<li class="page-item"><Link href={null} class="page-link">4</Link></li>
					<li class="page-item"><Link href={null} class="page-link">5</Link></li>
					<li class="page-item">
						<Link href={null} class="page-link"><i class="mdi mdi-chevron-right" /></Link>
					</li>
				</ul>
			</div>
			<!-- end col -->
		</Row><!-- end row -->
	</Container>
</div>
