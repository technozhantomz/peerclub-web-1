<script>
	import {
		Col,
		Container,
		Row,
		Card,
		CardHeader,
		CardBody,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Label,
		Input,
		Modal,
		ModalHeader,
		ModalBody,
		Form,
		ModalFooter,
		Table,
		Button
	} from 'sveltestrap';

	import Select from 'svelte-select';
	import DeleteModal from '../../Components/Common/CDeleteModal.svelte';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import Link from 'svelte-link';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';
	import crmData from '../../common/data/crm';
	import ContactAction from './ContactAction.svelte';

	import avatar10 from '../../assets/images/users/avatar-10.jpg';
	let deleteModal = false;

	let open = false;
	const toggle = () => (open = !open);

	let sortBy = 'Name';

	const sortbyname = [
		{ label: 'Owner', value: 'Owner' },
		{ label: 'Company', value: 'Company' },
		{ label: 'Location', value: 'Location' }
	];

	const setDeleteModal = (status) => {
		deleteModal = status;
	};

	const data = crmData.crmcontacts;

	const columns = [
		{
			name: '#',
			width: '40px',
			formatter: (cell) =>
				html(`<div class="form-check"><input type="checkbox" class="form-check-input"/></div>`)
		},
		{
			id: 'img',
			hidden: true
		},
		{
			id: 'name',
			name: 'Name',
			formatter: (cell, row) =>
				html(
					`<div class="d-flex align-items-center">
						<div class="flex-shrink-0"><img src=${row.cells[1].data} alt="" class="avatar-xs rounded-circle"></div>
						<div class="flex-grow-1 ms-2 name">${cell}</div>
					</div>`
				)
		},
		{
			id: 'company',
			name: 'Company'
		},
		{
			id: 'email',
			name: 'Email id'
		},
		{
			id: 'phone',
			name: 'Phone No'
		},
		{
			id: 'score',
			name: 'Lead Score'
		},
		{
			id: 'date',
			name: 'Last Contacted',
			formatter: (contact) => html(`${contact[0]} <small class="text-muted">${contact[1]}</small>`)
		},
		{
			name: 'Action',
			plugin: {
				component: SvelteWrapper,
				props: {
					component: ContactAction
				}
			}
		}
	];
</script>

<svelte:head>
	<title>Contacts | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Contacts" pageTitle="CRM" />

		<Row>
			<Col lg={12}>
				<Card>
					<CardHeader>
						<div class="d-flex align-items-center flex-wrap gap-2">
							<div class="flex-grow-1">
								<Button color="" class="btn btn-info add-btn" on:click={toggle}>
									<i class="ri-add-fill me-1 align-bottom" /> Add Contacts
								</Button>
							</div>
							<div class="flex-shrink-0">
								<div class="hstack text-nowrap gap-2">
									<Button class="btn btn-secondary" color="secondary"
										><i class="ri-delete-bin-2-line" /></Button
									>
									<Button color="danger">
										<i class="ri-filter-2-line me-1 align-bottom" />{' '}
										Filters
									</Button>
									<Button color="" class="btn btn-soft-success">Import</Button>

									<Dropdown>
										<DropdownToggle href="" class="btn btn-soft-info" color="">
											<i class="ri-more-2-fill" />
										</DropdownToggle>
										<DropdownMenu class="dropdown-menu-end">
											<DropdownItem href="">All</DropdownItem>
											<DropdownItem href="">Last Week</DropdownItem>
											<DropdownItem href="">Last Month</DropdownItem>
											<DropdownItem href="">Last Year</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
						</div>
					</CardHeader>
				</Card>
			</Col>
			<Col xxl={9}>
				<Card id="contactList">
					<CardHeader>
						<Row class="g-3">
							<Col md={4}>
								<div class="search-box">
									<Input
										type="text"
										class="form-control search"
										placeholder="Search for contact..."
									/>
									<i class="ri-search-line search-icon" />
								</div>
							</Col>
							<div class="col-md-auto ms-auto">
								<div class="d-flex align-items-center gap-2">
									<span class="text-muted">Sort by: </span>
									<div class="select-single">
										<Select value={sortBy} items={sortbyname} id="choices-single-default" />
									</div>
								</div>
							</div>
						</Row>
					</CardHeader>
					<CardBody>
						<div>
							{#if crmData.crmcontacts.length > 0}
								<div class="table-card gridjs-border-none">
									<Grid
										{data}
										{columns}
										className={{ th: 'text-muted' }}
										pagination={{
											enabled: true,
											limit: 10
										}}
									/>
								</div>
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
											We've searched more than 150+ contacts We did not find any contacts for you
											search.
										</p>
									</div>
								</div>
							{/if}
						</div>

						<Modal id="showModal" isOpen={open} {toggle} centered>
							<ModalHeader class="bg-soft-info p-3" {toggle}>Add Contact</ModalHeader>

							<Form action="">
								<ModalBody>
									<Input type="hidden" id="id-field" />
									<Row class="g-3">
										<Col lg={12}>
											<div>
												<Label for="name-field" class="form-label">Name</Label>
												<Input
													type="text"
													id="customername-field"
													class="form-control"
													placeholder="Enter name"
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="company_name-field" class="form-label">Company Name</Label>
												<Input
													type="text"
													id="company_name-field"
													class="form-control"
													placeholder="Enter company name"
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="email_id-field" class="form-label">Email ID</Label>
												<Input
													type="text"
													id="email_id-field"
													class="form-control"
													placeholder="Enter email"
												/>
											</div>
										</Col>
										<Col lg={6}>
											<div>
												<Label for="phone-field" class="form-label">Phone</Label>
												<Input
													type="text"
													id="phone-field"
													class="form-control"
													placeholder="Enter phone no"
												/>
											</div>
										</Col>
										<Col lg={6}>
											<div>
												<Label for="lead_score-field" class="form-label">Lead Score</Label>
												<Input
													type="text"
													id="lead_score-field"
													class="form-control"
													placeholder="Enter value"
												/>
											</div>
										</Col>
									</Row>
								</ModalBody>
								<ModalFooter>
									<div class="hstack gap-2 justify-content-end">
										<Button color="light" on:click={toggle}>Close</Button>
										<Button
											type="submit"
											class="btn btn-success d-none"
											id="add-btn"
											on:click={toggle}
										>
											Add Contact
										</Button>
										<Button color="success" id="edit-btn" on:click={toggle}>Update</Button>
									</div>
								</ModalFooter>
							</Form>
						</Modal>

						<DeleteModal show={deleteModal} onCloseClick={() => setDeleteModal(false)} />
					</CardBody>
				</Card>
			</Col>
			<Col xxl={3}>
				<Card>
					<CardBody class="text-center">
						<div class="position-relative d-inline-block">
							<img src={avatar10} alt="" class="avatar-lg rounded-circle img-thumbnail" />
							<span class="contact-active position-absolute rounded-circle bg-success">
								<span class="visually-hidden" />
							</span>
						</div>
						<h5 class="mt-4 mb-1">Tonya Noble</h5>
						<p class="text-muted">Nesta Technologies</p>

						<ul class="list-inline mb-0">
							<li class="list-inline-item avatar-xs">
								<Link href="" class="avatar-title bg-soft-success text-success fs-15 rounded">
									<i class="ri-phone-line" />
								</Link>
							</li>
							<li class="list-inline-item avatar-xs">
								<Link href="" class="avatar-title bg-soft-danger text-danger fs-15 rounded">
									<i class="ri-mail-line" />
								</Link>
							</li>
							<li class="list-inline-item avatar-xs">
								<Link href="" class="avatar-title bg-soft-warning text-warning fs-15 rounded">
									<i class="ri-question-answer-line" />
								</Link>
							</li>
						</ul>
					</CardBody>
					<CardBody>
						<h6 class="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6>
						<p class="text-muted mb-4">
							Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the
							job you are applying for. It states what kind of career you are seeking, and what
							skills and experiences.
						</p>
						<div class="table-responsive table-card">
							<Table class="table table-borderless mb-0">
								<tbody>
									<tr>
										<td class="fw-medium"> Designation </td>
										<td>Lead Designer / Developer</td>
									</tr>
									<tr>
										<td class="fw-medium"> Email ID </td>
										<td>tonyanoble@peerclub.com</td>
									</tr>
									<tr>
										<td class="fw-medium"> Phone No </td>
										<td>414-453-5725</td>
									</tr>
									<tr>
										<td class="fw-medium"> Lead Score </td>
										<td>154</td>
									</tr>
									<tr>
										<td class="fw-medium"> Tags </td>
										<td>
											<span class="badge badge-soft-primary me-1"> Lead </span>
											<span class="badge badge-soft-primary"> Partner </span>
										</td>
									</tr>
									<tr>
										<td class="fw-medium"> Last Contacted </td>
										<td>
											15 Dec, 2021{' '}
											<small class="text-muted">08:58AM</small>
										</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</div>
