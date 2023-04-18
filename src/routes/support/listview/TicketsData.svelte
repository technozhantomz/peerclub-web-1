<script>
	import { Card, CardBody, Col, Modal, ModalBody, Row } from 'sveltestrap';
	import Select from 'svelte-select';
	import Flatpickr from 'svelte-flatpickr';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';
	import Actions from './Actions.svelte';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';

	const allStatus = [
		{ label: 'Status', value: 'Status' },
		{ label: 'All', value: 'All' },
		{ label: 'Open', value: 'Open' },
		{ label: 'Inprogress', value: 'Inprogress' },
		{ label: 'Closed', value: 'Closed' },
		{ label: 'New', value: 'New' }
	];

	export let ticketsTable;

	const data = ticketsTable;

	const columns = [
		{
			name: '#',
			width: '40px',
			formatter: (cell) =>
				html(`<div class="form-check"><input type="checkbox" class="form-check-input"/></div>`)
		},
		{
			id: 'ticketId',
			name: 'ID',
			formatter: (cell) =>
				html(
					`<a href="/support/ticketsdetails/apps-tickets-details" className="fw-medium link-primary">${cell}</a>`
				)
		},
		{
			id: 'title',
			name: 'Title'
		},
		{
			id: 'client',
			name: 'Client'
		},
		{
			id: 'assigned',
			name: 'Assigned To'
		},
		{
			id: 'createDate',
			name: 'Create Date'
		},
		{
			id: 'dueDate',
			name: 'Due Date'
		},
		{
			id: 'status',
			name: 'Status',
			formatter: (cell) => {
				if (cell == 'Inprogress') {
					return html(`<span class="badge badge-soft-warning text-uppercase">${cell}</span>`);
				} else if (cell == 'Open') {
					return html(`<span class="badge badge-soft-success text-uppercase">${cell}</span>`);
				} else if (cell == 'New') {
					return html(`<span class="badge badge-soft-info text-uppercase">${cell}</span>`);
				} else if (cell == 'Closed') {
					return html(`<span class="badge badge-soft-danger text-uppercase">${cell}</span>`);
				} else {
					return null;
				}
			}
		},
		{
			id: 'priority',
			name: 'Priority',
			formatter: (cell) => {
				if (cell == 'Medium') {
					return html(`<span class="badge bg-warning text-uppercase">${cell}</span>`);
				} else if (cell == 'High') {
					return html(`<span class="badge bg-danger text-uppercase">${cell}</span>`);
				} else if (cell == 'Low') {
					return html(`<span class="badge bg-success text-uppercase">${cell}</span>`);
				} else {
					return null;
				}
			}
		},
		{
			name: 'Actions',
			plugin: {
				component: SvelteWrapper,
				props: {
					component: Actions
				}
			}
		}
	];
</script>

<Row>
	<Col lg={12}>
		<Card id="ticketsList">
			<div class="card-header border-0">
				<div class="d-flex align-items-center">
					<h5 class="card-title mb-0 flex-grow-1">Tickets</h5>
					<div class="flex-shrink-0">
						<button class="btn btn-danger add-btn"
							><i class="ri-add-line align-bottom me-1" /> Create Tickets</button
						>
						<button class="btn btn-secondary"><i class="ri-delete-bin-2-line" /></button>
					</div>
				</div>
			</div>
			<CardBody class="border border-dashed border-end-0 border-start-0">
				<form>
					<Row class="g-3">
						<Col xxl={5} sm={12}>
							<div class="search-box">
								<input
									type="text"
									class="form-control search bg-light border-light"
									placeholder="Search for ticket details or something..."
								/>
								<i class="ri-search-line search-icon" />
							</div>
						</Col>
						<!--end col-->

						<Col xxl={3} sm={4}>
							<Flatpickr
								class="form-control bg-light border-light"
								options={{
									dateFormat: 'd M, Y'
								}}
								placeholder="Selact Date"
							/>
						</Col>
						<!--end col-->

						<Col xxl={3} sm={4}>
							<div class="input-light select-single">
								<Select id="idStatus" items={allStatus} />
							</div>
						</Col>
						<!--end col-->
						<div class="col-xxl-1 col-sm-4">
							<button type="button" class="btn btn-primary w-100">
								<i class="ri-equalizer-fill me-1 align-bottom" />
								Filters
							</button>
						</div>
						<!--end col-->
					</Row>
					<!--end row-->
				</form>
			</CardBody>
			<!--end card-body-->
			<CardBody>
				<div class="table-card gridjs-border-none">
					{#if ticketsTable.length > 0}
						<Grid
							{data}
							{columns}
							className={{ th: 'text-muted' }}
							pagination={{ enabled: true, limit: 10 }}
						/>
					{:else}
						<div class="noresult">
							<div class="text-center">
								<lord-icon
									src="//cdn.lordicon.com/msoeawqm.json"
									trigger="loop"
									colors="primary:#121331,secondary:#08a88a"
									style="width:75px;height:75px"
								/>
								<h5 class="mt-2">Sorry! No Result Found</h5>
								<p class="text-muted mb-0">
									We've searched more than 200k+ tasks We did not find any tasks for you search.
								</p>
							</div>
						</div>
					{/if}
				</div>

				<!-- Modal -->
				<Modal class="flip" id="deleteOrder" tabindex="-1" aria-hidden="true">
					<ModalBody class="p-5 text-center">
						<lord-icon
							src="//cdn.lordicon.com/gsqxdxog.json"
							trigger="loop"
							colors="primary:#405189,secondary:#f06548"
							style="width:90px;height:90px"
						/>
						<div class="mt-4 text-center">
							<h4>You are about to delete a order ?</h4>
							<p class="text-muted fs-14 mb-4">
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
			<!--end card-body-->
		</Card>
		<!--end card-->
	</Col>
	<!--end col-->
</Row>
