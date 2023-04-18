<script>
	import {
		Container,
		Card,
		CardHeader,
		Row,
		Col,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		CardBody,
		Modal,
		ModalHeader,
		ModalBody,
		Button,
		Input,
		Label
	} from 'sveltestrap';

	import DeleteModal from '../../Components/Common/CDeleteModal.svelte';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import crmData from '../../common/data/crm';
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';
	import CompanyAction from './CompanyAction.svelte';
	import Flatpickr from 'svelte-flatpickr';
	import CrmFilter from './CrmFilter.svelte';

	let open = false;
	let filteropen = false;
	let deleteModal = false;

	const data = crmData.leads;

	const columns = [
		{
			name: '#',
			width: '40px',
			formatter: (cell) =>
				html(`<div class="form-check"><input type="checkbox" class="form-check-input"/></div>`)
		},
		{
			id: 'name',
			name: 'Name'
		},
		{
			id: 'company',
			name: 'Company'
		},
		{
			id: 'score',
			name: 'Leads Score'
		},
		{
			id: 'phone',
			name: 'Phone No'
		},
		{
			id: 'location',
			name: 'Location'
		},
		{
			id: 'date',
			name: 'Create Date'
		},
		{
			name: 'Action',
			plugin: {
				component: SvelteWrapper,
				props: {
					component: CompanyAction
				}
			}
		}
	];

	const setDeleteModal = (status) => {
		deleteModal = status;
	};

	const setIsInfoDetails = (status) => {
		filteropen = status;
	};

	const toggle = () => (open = !open);
	const filterToggle = () => (filteropen = !filteropen);
</script>

<svelte:head>
	<title>Leads | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Leads" pageTitle="CRM" />
		<Row>
			<Col lg={12}>
				<Card id="leadsList">
					<CardHeader class="border-0">
						<Row class="g-4 align-items-center">
							<Col sm={3}>
								<div class="search-box">
									<Input type="text" class="form-control search" placeholder="Search for..." />
									<i class="ri-search-line search-icon" />
								</div>
							</Col>
							<div class="col-sm-auto ms-auto">
								<div class="hstack gap-2">
									<Button class="btn btn-danger" onClick="deleteMultiple()"
										><i class="ri-delete-bin-2-line" /></Button
									>
									<Button type="button" class="btn btn-info" on:click={filterToggle}
										><i class="ri-filter-3-line align-bottom me-1" /> Fliters</Button
									>
									<Button type="button" class="btn btn-success add-btn" on:click={toggle}
										><i class="ri-add-line align-bottom me-1" /> Add Leads</Button
									>
									<Dropdown>
										<DropdownToggle
											class="btn btn-soft-info btn-icon fs-14"
											color=""
											id="dropdownMenuButton1"
										>
											<i class="ri-settings-4-line" />
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem href={null}>Copy</DropdownItem>
											<DropdownItem href={null}>Move to pipline</DropdownItem>
											<DropdownItem href={null}>Add to exceptions</DropdownItem>
											<DropdownItem href={null}>Switch to common form view</DropdownItem>
											<DropdownItem href={null}>Reset form view to default</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
						</Row>
					</CardHeader>
					<CardBody>
						<div>
							<div class="table-responsive table-card gridjs-border-none">
								{#if crmData.leads.length > 0}
									<Grid
										{data}
										{columns}
										className={{ th: 'text-muted' }}
										pagination={{
											enabled: true,
											limit: 10
										}}
									/>
								{:else}
									<div class="noresult" style="display: none">
										<div class="text-center">
											<lord-icon
												src="//cdn.lordicon.com/msoeawqm.json"
												trigger="loop"
												colors="primary:#121331,secondary:#08a88a"
												style="width:75px;height:75px"
											/>
											<h5 class="mt-2">Sorry! No Result Found</h5>
											<p class="text-muted mb-0">
												We've searched more than 150+ leads We did not find any leads for you
												search.
											</p>
										</div>
									</div>
								{/if}
							</div>
						</div>
						<Modal id="showModal" isOpen={open} {toggle}>
							<ModalHeader {toggle} class="bg-light p-3">Add Leads</ModalHeader>
							<form action="">
								<ModalBody>
									<Input type="hidden" id="id-field" />
									<Row class="g-3">
										<div class="col-lg-12">
											<div>
												<Label for="name-field" class="form-label">Name</Label>
												<Input
													type="text"
													id="customername-field"
													class="form-control"
													placeholder="Enter Name"
													required
												/>
											</div>
										</div>
										<!--end col-->
										<div class="col-lg-12">
											<div>
												<Label for="company_name-field" class="form-label">Company Name</Label>
												<Input
													type="email"
													id="company_name-field"
													class="form-control"
													placeholder="Enter company name"
													required
												/>
											</div>
										</div>
										<!--end col-->
										<div class="col-lg-6">
											<div>
												<Label for="leads_score-field" class="form-label">Leads Score</Label>
												<Input
													type="text"
													id="leads_score-field"
													class="form-control"
													placeholder="Enter lead score"
													required
												/>
											</div>
										</div>
										<!--end col-->
										<div class="col-lg-6">
											<div>
												<Label for="phone-field" class="form-label">Phone</Label>
												<Input
													type="text"
													id="phone-field"
													class="form-control"
													placeholder="Enter phone no"
													required
												/>
											</div>
										</div>
										<!--end col-->
										<div class="col-lg-12">
											<div>
												<Label for="location-field" class="form-label">Location</Label>
												<Input
													type="text"
													id="location-field"
													class="form-control"
													placeholder="Enter location"
													required
												/>
											</div>
										</div>
										<!--end col-->
										<div class="col-lg-12">
											<div>
												<Label for="date-field" class="form-label">Created Date</Label>
												<Flatpickr
													class="form-control"
													id="datepicker-publish-input"
													placeholder="Select a date"
													items={{
														altInput: true,
														altFormat: 'F j, Y',
														mode: 'multiple',
														dateFormat: 'd.m.y'
													}}
												/>
											</div>
										</div>
										<!--end col-->
									</Row>
									<!--end row-->
								</ModalBody>
								<div class="modal-footer">
									<div class="hstack gap-2 justify-content-end">
										<Button type="button" class="btn btn-light" data-bs-dismiss="modal"
											>Close</Button
										>
										<Button color="success" id="add-btn" on:click={toggle}>Add leads</Button>
										<Button color="success" id="edit-btn" on:click={toggle}>Update</Button>
									</div>
								</div>
							</form>
						</Modal>
						<!--end modal-->

						<DeleteModal show={deleteModal} onCloseClick={() => setDeleteModal(false)} />

						<CrmFilter show={filteropen} onCloseClick={() => setIsInfoDetails(false)} />

						<!--end offcanvas-->
					</CardBody>
				</Card>
			</Col>
			<!--end col-->
		</Row>
	</Container>
</div>
