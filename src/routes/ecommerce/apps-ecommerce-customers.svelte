<script>
	import {
		Container,
		Row,
		Col,
		Card,
		CardHeader,
		CardBody,
		Modal,
		Form,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Label,
		Input
	} from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import ecommerceData from '../../common/data/ecommerce';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';
	import Flatpickr from 'svelte-flatpickr';
	import Select from 'svelte-select';

	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);

	const data = ecommerceData.customerList;

	const customermocalstatus = [
		{ label: 'Status', value: 'Status' },
		{ label: 'Active', value: 'Active' },
		{ label: 'Block', value: 'Block' }
	];

	const customerstatus = [
		{ label: 'Status', value: 'Status' },
		{ label: 'All', value: 'All' },
		{ label: 'Active', value: 'Active' },
		{ label: 'Block', value: 'Block' }
	];

	const columns = [
		{
			name: '#',
			width: '40px',
			formatter: (cell) =>
				html(`<div class="form-check"><input type="checkbox" class="form-check-input"/></div>`)
		},
		'Customer',
		'Email',
		'Phone',
		'Date',
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
				<span
              class=
                "badge text-uppercase badge-soft-${row.cells[6].data}"
            >
			${row.cells[5].data}
            </span>`)
		},
		{
			name: 'Action',
			formatter: (cell, row) =>
				html(`<ul class="list-inline hstack gap-2 mb-0">
              <li class="list-inline-item edit" title="Edit">
                <a
                  href="/#"
                  class="text-primary d-inline-block edit-item-btn"
                  on:click={toggle}
                >
                  <i class="ri-pencil-fill fs-16"></i>
                </a>
              </li>
              <li class="list-inline-item" title="Remove">
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
	<title>Customers | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Customers" pageTitle="Ecommerce" />

		<Row>
			<Col lg={12}>
				<Card id="customerList">
					<CardHeader class="border-bottom-dashed">
						<Row class="g-4 align-items-center">
							<div class="col-sm">
								<div>
									<h5 class="card-title mb-0">Customer List</h5>
								</div>
							</div>
							<div class="col-sm-auto">
								<div>
									<button
										type="button"
										class="btn btn-success add-btn"
										id="create-btn"
										on:click={toggle}
									>
										<i class="ri-add-line align-bottom me-1" /> Add Customer
									</button>{' '}
									<button type="button" class="btn btn-info">
										<i class="ri-file-download-line align-bottom me-1" />{' '}
										Import
									</button>
								</div>
							</div>
						</Row>
					</CardHeader>
					<CardBody class="border-bottom-dashed border-bottom">
						<form>
							<Row class="g-3">
								<Col xl={6}>
									<div class="search-box">
										<input
											type="text"
											class="form-control search /"
											placeholder="Search for customer, email, phone, status or something..."
										/>
										<i class="ri-search-line search-icon" />
									</div>
								</Col>

								<Col xl={6}>
									<Row class="g-3">
										<Col sm={4}>
											<div class="">
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

										<Col sm={4}>
											<div class="select-single">
												<Select
													class="form-control"
													name="choices-single-default"
													title="idStatus"
													items={customerstatus}
												/>
											</div>
										</Col>

										<Col sm={4}>
											<div>
												<button type="button" class="btn btn-primary w-100">
													{' '}
													<i class="ri-equalizer-fill me-2 align-bottom" />
													Filters
												</button>
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
						</form>
					</CardBody>
					<div class="card-body">
						<div class="table-card gridjs-border-none">
							<Grid
								{data}
								{columns}
								className={{ th: 'text-muted' }}
								pagination={{ enabled: true, limit: 8 }}
							/>
						</div>
					</div>
				</Card>
			</Col>
		</Row>
	</Container>
</div>

<Modal id="showModal" {isOpen} {toggle} centered>
	<ModalHeader class="bg-light p-3">Add Customer</ModalHeader>
	<Form action="">
		<ModalBody>
			<input type="hidden" id="id-field" />

			<div class="mb-3" id="modal-id" style="display: none">
				<Label for="id-field1" class="form-label">ID</Label>
				<Input type="text" id="id-field1" class="form-control" placeholder="ID" readOnly />
			</div>

			<div class="mb-3">
				<Label for="customername-field" class="form-label">Customer Name</Label>
				<Input type="text" id="customername-field" class="form-control" placeholder="Enter Name" />
			</div>

			<div class="mb-3">
				<Label for="email-field" class="form-label">Email</Label>
				<Input type="email" id="email-field" class="form-control" placeholder="Enter Email" />
			</div>

			<div class="mb-3">
				<Label for="phone-field" class="form-label">Phone</Label>
				<Input type="text" id="phone-field" class="form-control" placeholder="Enter Phone no." />
			</div>

			<div class="mb-3">
				<Label for="date-field" class="form-label">Joining Date</Label>
				<Flatpickr
					class="form-control"
					id="date-field"
					placeholder="Select Joining Date"
					options={{
						altInput: true,
						altFormat: 'F j, Y',
						mode: 'multiple',
						dateFormat: 'd.m.y'
					}}
				/>
			</div>

			<div>
				<Label for="status-field" class="form-label">Status</Label>
				<Select items={customermocalstatus} name="status-field" id="status-field" />
			</div>
		</ModalBody>
		<ModalFooter>
			<div class="hstack gap-2 justify-content-end">
				<button type="button" class="btn btn-light" on:click={toggle}> Close </button>
				<button type="submit" class="btn btn-success" id="add-btn" on:click={toggle}>
					Add Customer
				</button>
				<button type="button" class="btn btn-success d-none" id="edit-btn" on:click={toggle}>
					Update
				</button>
			</div>
		</ModalFooter>
	</Form>
</Modal>
