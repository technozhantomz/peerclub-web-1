<script>
	import { Container, Row, Col, Card, CardBody, Input, Modal, ModalBody, Label } from 'sveltestrap';
	import Flatpickr from 'svelte-flatpickr';
	import Select from 'svelte-select';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';

	import ecommerceData from '../../common/data/ecommerce';

	const options = [
		{ value: 'Status', label: 'Status' },
		{ value: 'all', label: 'all' },
		{ value: 'Pending', label: 'Pending' },
		{ value: 'Inprogress', label: 'Inprogress' },
		{ value: 'Cancelled', label: 'Cancelled' },
		{ value: 'Pickups', label: 'Pickups' },
		{ value: 'Returns', label: 'Returns' },
		{ value: 'Delivered', label: 'Delivered' }
	];

	const optionpayments = [
		{ value: 'Payment', label: 'Payment' },
		{ value: 'Mastercard', label: 'Mastercard' },
		{ value: 'Paypal', label: 'Paypal' },
		{ value: 'Visa', label: 'Visa' },
		{ value: 'COD', label: 'COD' }
	];

	const data = ecommerceData.orders;

	const columns = [
		{
			name: '#',
			width: '40px',
			formatter: (cell) =>
				html(`<div class="form-check"><input type="checkbox" class="form-check-input"/></div>`)
		},
		{
			name: 'Order Id',
			formatter: (cell) =>
				html(`<a href="/ecommerce/apps-ecommerce-order-details"><a>${cell}</a></a>`)
		},
		'Customer',
		{
			id: 'productname',
			name: 'Product',
			formatter: (_, row) => row.cells[3].data
		},
		{
			name: 'Order Date',
			formatter: (order) => html(`${order[0]}, <small class="text-muted">${order[1]}</small>`)
		},
		'Amount',
		{
			id: 'payment',
			name: 'Payment Method'
		},
		{
			id: 'status',
			hidden: true
		},
		{
			id: 'statusClass',
			hidden: true
		},
		{
			id: 'status',
			name: 'Delivery Status',
			formatter: (cell, row) =>
				html(`
				<span class="badge text-uppercase badge-soft-${row.cells[8].data}"
            >
			${row.cells[7].data}
            </span>`)
		},
		{
			name: 'Action',
			formatter: (cell, row) =>
				html(`<ul class="list-inline hstack gap-2 mb-0">
              <li class="list-inline-item">
                <a
                  href="/ecommerce/apps-ecommerce-order-details"
                  class="text-primary d-inline-block"
                >
                  <i class="ri-eye-fill fs-16"></i>
                </a>
              </li>
              <li class="list-inline-item edit">
                <a
                  href="/#"
                  class="text-primary d-inline-block edit-item-btn"
                >
                  <i class="ri-pencil-fill fs-16"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  href="/#"
                  class="text-danger d-inline-block remove-item-btn"
                >
                  <i class="ri-delete-bin-5-fill fs-16"></i>
                </a>
              </li>
            </ul>`)
		}
	];
</script>

<svelte:head>
	<title>Orders | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Orders" pageTitle="Ecommerce" />

		<Row>
			<Col lg={12}>
				<Card id="orderList">
					<div class="card-header border-0">
						<div class="d-flex align-items-center">
							<h5 class="card-title mb-0 flex-grow-1">Order History</h5>
							<div class="flex-shrink-0">
								<button
									type="button"
									class="btn btn-success add-btn"
									data-bs-toggle="modal"
									id="create-btn"
									data-bs-target="#showModal"
									><i class="ri-add-line align-bottom me-1" /> Create Order</button
								>
								<button type="button" class="btn btn-info"
									><i class="ri-file-download-line align-bottom me-1" /> Import</button
								>
							</div>
						</div>
					</div>
					<CardBody class="border border-dashed border-end-0 border-start-0">
						<form>
							<Row class="g-3">
								<Col sm={6} class="col-xxl-5">
									<div class="search-box">
										<Input
											type="text"
											class="form-control search"
											placeholder="Search for order ID, customer, order status or something..."
										/>
										<i class="ri-search-line search-icon" />
									</div>
								</Col>
								<!--end col-->
								<Col sm={6} class="col-xxl-2">
									<div>
										<Flatpickr
											class="form-control"
											placeholder="Select date"
											options={{
												mode: 'range',
												dateFormat: 'd M, Y',
												defaultDate: ['01 Jan 2022', '31 Jan 2022']
											}}
										/>
									</div>
								</Col>
								<!--end col-->
								<Col sm={4} class="col-xxl-2">
									<div class="select-single">
										<Select
											class="form-control"
											placeholder="Choose ..."
											title="idStatus"
											items={options}
										/>
									</div>
								</Col>
								<!--end col-->
								<Col sm={4} class="col-xxl-2">
									<div class="select-single">
										<Select
											class="form-control"
											placeholder="Choose ..."
											title="idStatus"
											items={optionpayments}
										/>
									</div>
								</Col>
								<!--end col-->
								<Col sm={4} class="col-xxl-1">
									<div>
										<button type="button" class="btn btn-primary w-100" onclick="SearchData();">
											<i class="ri-equalizer-fill me-1 align-bottom" />
											Filters
										</button>
									</div>
								</Col>
								<!--end col-->
							</Row>
							<!--end row-->
						</form>
					</CardBody>
					<CardBody class="pt-0">
						<div>
							<ul class="nav nav-tabs nav-tabs-custom nav-success mb-3" role="tablist">
								<li class="nav-item">
									<a
										class="nav-link active All py-3"
										data-bs-toggle="tab"
										id="All"
										href="#home1"
										role="tab"
										aria-selected="true"
									>
										<i class="ri-store-2-fill me-1 align-bottom" /> All Orders
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link py-3 Delivered"
										data-bs-toggle="tab"
										id="Delivered"
										href="#delivered"
										role="tab"
										aria-selected="false"
									>
										<i class="ri-checkbox-circle-line me-1 align-bottom" /> Delivered
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link py-3 Pickups"
										data-bs-toggle="tab"
										id="Pickups"
										href="#pickups"
										role="tab"
										aria-selected="false"
									>
										<i class="ri-truck-line me-1 align-bottom" /> Pickups
										<span class="badge bg-danger align-middle ms-1">2</span>
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link py-3 Returns"
										data-bs-toggle="tab"
										id="Returns"
										href="#returns"
										role="tab"
										aria-selected="false"
									>
										<i class="ri-arrow-left-right-fill me-1 align-bottom" /> Returns
									</a>
								</li>
								<li class="nav-item">
									<a
										class="nav-link py-3 Cancelled"
										data-bs-toggle="tab"
										id="Cancelled"
										href="#cancelled"
										role="tab"
										aria-selected="false"
									>
										<i class="ri-close-circle-line me-1 align-bottom" /> Cancelled
									</a>
								</li>
							</ul>

							<div class="table-responsive table-card gridjs-border-none">
								<Grid
									{data}
									{columns}
									class={{ th: 'text-muted' }}
									pagination={{ enabled: true, limit: 10 }}
								/>

								<div class="noresult" style="display: none">
									<div class="text-center">
										<lord-icon
											src="//cdn.lordicon.com/msoeawqm.json"
											trigger="loop"
											colors="primary:#405189,secondary:#0ab39c"
											style="width:75px;height:75px"
										/>
										<h5 class="mt-2">Sorry! No Result Found</h5>
										<p class="text-muted">
											We've searched more than 150+ Orders We did not find any orders for you
											search.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							class="modal fade"
							id="showModal"
							tabindex="-1"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true"
						>
							<div class="modal-dialog modal-dialog-centered">
								<div class="modal-content">
									<div class="modal-header bg-light p-3">
										<h5 class="modal-title" id="exampleModalLabel">&nbsp;</h5>
										<button
											type="button"
											class="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
											id="close-modal"
										/>
									</div>
									<form action="">
										<div class="modal-body">
											<Input type="hidden" id="id-field" />

											<div class="mb-3" id="modal-id">
												<Label for="orderId" class="form-label">ID</Label>
												<Input
													type="text"
													id="orderId"
													class="form-control"
													placeholder="ID"
													readonly
												/>
											</div>

											<div class="mb-3">
												<Label for="customername-field" class="form-label">Customer Name</Label>
												<Input
													type="text"
													id="customername-field"
													class="form-control"
													placeholder="Enter Name"
													required
												/>
											</div>

											<div class="mb-3">
												<Label for="productname-field" class="form-label">Product</Label>
												<select
													class="form-control"
													data-trigger
													name="productname-field"
													id="productname-field"
												>
													<option value="">Product</option>
													<option value="Puma Tshirt">Puma Tshirt</option>
													<option value="Adidas Sneakers">Adidas Sneakers</option>
													<option value="350 ml Glass Grocery Container"
														>350 ml Glass Grocery Container</option
													>
													<option value="American egale outfitters Shirt"
														>American egale outfitters Shirt</option
													>
													<option value="Galaxy Watch4">Galaxy Watch4</option>
													<option value="Apple iPhone 12">Apple iPhone 12</option>
													<option value="Funky Prints T-shirt">Funky Prints T-shirt</option>
													<option value="USB Flash Drive Personalized with 3D Print">
														USB Flash Drive Personalized with 3D Print</option
													>
													<option value="Oxford Button-Down Shirt">Oxford Button-Down Shirt</option>
													<option value="Classic Short Sleeve Shirt"
														>Classic Short Sleeve Shirt</option
													>
													<option value="Half Sleeve T-Shirts (Blue)"
														>Half Sleeve T-Shirts (Blue)</option
													>
													<option value="Noise Evolve Smartwatch">Noise Evolve Smartwatch</option>
												</select>
											</div>

											<div class="mb-3">
												<Label for="date-field" class="form-label">Order Date</Label>
												<Input
													type="date"
													id="date-field"
													class="form-control"
													data-provider="flatpickr"
													data-date-format="d M, Y"
													data-enable-time
													required
												/>
											</div>

											<div class="row gy-4 mb-3">
												<div class="col-md-6">
													<div>
														<Label for="amount-field" class="form-label">Amount</Label>
														<Input
															type="text"
															id="amount-field"
															class="form-control"
															placeholder="Total amount"
															required
														/>
													</div>
												</div>
												<div class="col-md-6">
													<div>
														<Label for="payment-field" class="form-label">Payment Method</Label>
														<select
															class="form-control"
															data-trigger
															name="payment-method"
															id="payment-field"
														>
															<option value="">Payment Method</option>
															<option value="Mastercard">Mastercard</option>
															<option value="Visa">Visa</option>
															<option value="COD">COD</option>
															<option value="Paypal">Paypal</option>
														</select>
													</div>
												</div>
											</div>

											<div>
												<Label for="delivered-status" class="form-label">Delivery Status</Label>
												<select
													class="form-control"
													data-trigger
													name="delivered-status"
													id="delivered-status"
												>
													<option value="">Delivery Status</option>
													<option value="Pending">Pending</option>
													<option value="Inprogress">Inprogress</option>
													<option value="Cancelled">Cancelled</option>
													<option value="Pickups">Pickups</option>
													<option value="Delivered">Delivered</option>
													<option value="Returns">Returns</option>
												</select>
											</div>
										</div>
										<div class="modal-footer">
											<div class="hstack gap-2 justify-content-end">
												<button type="button" class="btn btn-light" data-bs-dismiss="modal"
													>Close</button
												>
												<button type="submit" class="btn btn-success" id="add-btn">Add Order</button
												>
												<button type="button" class="btn btn-success" id="edit-btn">Update</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<!-- Modal -->
						<Modal class="flip" id="deleteOrder">
							<ModalBody class="p-5 text-center">
								<lord-icon
									src="//cdn.lordicon.com/gsqxdxog.json"
									trigger="loop"
									colors="primary:#405189,secondary:#f06548"
									style="width:90px;height:90px"
								/>
								<div class="mt-4 text-center">
									<h4>You are about to delete a order ?</h4>
									<p class="text-muted fs-15 mb-4">
										Deleting your order will remove all of your information from our database.
									</p>
									<div class="hstack gap-2 justify-content-center remove">
										<button
											class="btn btn-link link-success fw-medium text-decoration-none"
											data-bs-dismiss="modal"
											><i class="ri-close-line me-1 align-middle" />
											Close</button
										>
										<button class="btn btn-danger" id="delete-record">Yes, Delete It</button>
									</div>
								</div>
							</ModalBody>
						</Modal>
						<!--end modal -->
					</CardBody>
				</Card>
			</Col>
			<!--end col-->
		</Row>
	</Container>
</div>

<style global>
	@import '//cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>
