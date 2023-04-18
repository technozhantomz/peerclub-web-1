<script>
	import {
		Col,
		Container,
		Row,
		Card,
		CardHeader,
		CardBody,
		ModalBody,
		Label,
		Input,
		Modal,
		ModalHeader,
		Form,
		Button,
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		Table
	} from 'sveltestrap';
	import Select from 'svelte-select';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import crmData from '../../common/data/crm';
	import { html } from 'gridjs';
	import Grid from 'gridjs-svelte';
	import { SvelteWrapper } from 'gridjs-svelte/plugins';
	import CompanyAction from './CompanyAction.svelte';

	import mail_chimp from '../../assets/images/brands/mail_chimp.png';

	let open = false;
	const toggle = () => (open = !open);

	let sortBy = 'Owner';
	const sortbyname = [
		{ label: 'Owner', value: 'Owner' },
		{ label: 'Company', value: 'Company' },
		{ label: 'Location', value: 'Location' }
	];

	const industrytype = [
		{ label: 'Select industry type', value: 'Select industry type' },
		{ label: 'Computer Industry', value: 'Computer Industry' },
		{ label: 'Chemical Industries', value: 'Chemical Industries' },
		{ label: 'Health Services', value: 'Health Services' },
		{
			label: 'Telecommunications Services',
			value: 'Telecommunications Services'
		},
		{
			label: 'Textiles: Clothing, Footwear',
			value: 'Textiles: Clothing, Footwear'
		}
	];

	const data = crmData.companies;
	const columns = [
		{
			name: '#',
			width: '40px',
			formatter: (cell) =>
				html(`<div class="form-check">
              <input class="form-check-input" type="checkbox" name="checkAll" value="option1" />
            </div>`)
		},
		{
			id: 'img',
			hidden: true
		},
		{
			id: 'companyName',
			name: 'Company Name',
			formatter: (cell, row) =>
				html(`<div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <img
                  src=${row.cells[1].data}
                  alt=""
                  class="avatar-xxs rounded-circle"
                />
              </div>
              <div class="flex-grow-1 ms-2 name">
                ${cell}
              </div>
            </div>`)
		},
		{
			id: 'owner',
			name: 'Owner'
		},
		{
			id: 'industryType',
			name: 'Industry Type'
		},
		{
			id: 'rating',
			name: 'Rating',
			formatter: (cell) =>
				html(
					`<span class="star_value">${cell}</span> <i class="ri-star-fill text-warning align-bottom"></i>`
				)
		},
		{
			id: 'location',
			name: 'Location'
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
</script>

<svelte:head>
	<title>Companies | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Companies" pageTitle="CRM" />
		<Row>
			<Col lg={12}>
				<Card>
					<CardHeader>
						<div class="d-flex align-items-center flex-wrap gap-2">
							<div class="flex-grow-1">
								<Button class="btn btn-info add-btn" on:click={toggle}
									><i class="ri-add-fill me-1 align-bottom" />
									Add Company</Button
								>
							</div>
							<div class="flex-shrink-0">
								<div class="hstack text-nowrap gap-2">
									<Button color="" class="btn btn-secondary" onClick="deleteMultiple()"
										><i class="ri-delete-bin-2-line" /></Button
									>
									<Button color="danger" data-bs-toggle="modal" data-bs-target="#addmembers"
										><i class="ri-filter-2-line me-1 align-bottom" /> Filters</Button
									>
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
			<!--end col-->
			<Col xxl={9}>
				<Card id="companyList">
					<CardHeader>
						<Row class="g-2">
							<Col md={3}>
								<div class="search-box">
									<Input
										type="text"
										class="form-control search"
										placeholder="Search for company..."
									/>
									<i class="ri-search-line search-icon" />
								</div>
							</Col>
							<div class="col-md-auto ms-auto">
								<div class="d-flex align-items-center gap-2">
									<span class="text-muted">Sort by: </span>
									<div class="select-single">
										<Select id="choices-single-default" value={sortBy} items={sortbyname} />
									</div>
								</div>
							</div>
						</Row>
					</CardHeader>
					<CardBody>
						<div>
							<div class="table-responsive table-card gridjs-border-none">
								{#if crmData.companies.length > 0}
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
												We've searched more than 150+ companies We did not find any companies for
												you search.
											</p>
										</div>
									</div>
								{/if}
							</div>
						</div>

						<Modal id="showModal" isOpen={open} {toggle}>
							<ModalHeader class="bg-soft-info p-3" {toggle} />
							<Form action="">
								<ModalBody>
									<Input type="hidden" id="id-field" />
									<div class="row g-3">
										<Col lg={12}>
											<div>
												<Label for="name-field" class="form-label">Name</Label>
												<Input
													type="text"
													id="customername-field"
													class="form-control"
													placeholder="Enter company name"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="owner-field" class="form-label">Owner Name</Label>
												<Input
													type="text"
													id="owner-field"
													class="form-control"
													placeholder="Enter owner name"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="industry_type-field" class="form-label">Industry Type</Label>
												<Select id="industry_type-field" items={industrytype} />
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="star_value-field" class="form-label">Rating</Label>
												<Input
													type="text"
													id="star_value-field"
													class="form-control"
													placeholder="Enter rating"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="location-field" class="form-label">location</Label>
												<Input
													type="text"
													id="location-field"
													class="form-control"
													placeholder="Enter location"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="employee-field" class="form-label">Employee</Label>
												<Input
													type="text"
													id="employee-field"
													class="form-control"
													placeholder="Enter employee"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="website-field" class="form-label">Website</Label>
												<Input
													type="text"
													id="website-field"
													class="form-control"
													placeholder="Enter website"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="contact_email-field" class="form-label">Contact Email</Label>
												<Input
													type="text"
													id="contact_email-field"
													class="form-control"
													placeholder="Enter contact email"
													required
												/>
											</div>
										</Col>
										<Col lg={12}>
											<div>
												<Label for="since-field" class="form-label">Since</Label>
												<Input
													type="text"
													id="since-field"
													class="form-control"
													placeholder="Enter since"
													required
												/>
											</div>
										</Col>
									</div>
								</ModalBody>
								<div class="modal-footer">
									<div class="hstack gap-2 justify-content-end">
										<Button class="btn btn-light" on:click={toggle}>Close</Button>
										<Button class="btn btn-success" id="add-btn" on:click={toggle}
											>Add Company</Button
										>
										<Button class="btn btn-success d-none" id="edit-btn" on:click={toggle}
											>Update</Button
										>
									</div>
								</div>
							</Form>
						</Modal>
						<!--end add modal-->
					</CardBody>
				</Card>
				<!--end card-->
			</Col>
			<!--end col-->
			<Col xxl={3}>
				<Card id="company-view-detail">
					<CardBody class="text-center">
						<div class="position-relative d-inline-block">
							<div class="avatar-md">
								<div class="avatar-title bg-light rounded-circle">
									<img src={mail_chimp} alt="" class="avatar-xs" />
								</div>
							</div>
						</div>
						<h5 class="mt-3 mb-1">Syntyce Solution</h5>
						<p class="text-muted">Michael Morris</p>

						<ul class="list-inline mb-0">
							<li class="list-inline-item avatar-xs">
								<a href={null} class="avatar-title bg-soft-success text-success fs-15 rounded">
									<i class="ri-global-line" />
								</a>
							</li>
							<li class="list-inline-item avatar-xs">
								<a href={null} class="avatar-title bg-soft-danger text-danger fs-15 rounded">
									<i class="ri-mail-line" />
								</a>
							</li>
							<li class="list-inline-item avatar-xs">
								<a href={null} class="avatar-title bg-soft-warning text-warning fs-15 rounded">
									<i class="ri-question-answer-line" />
								</a>
							</li>
						</ul>
					</CardBody>
					<CardBody>
						<h6 class="text-muted text-uppercase fw-semibold mb-3">Information</h6>
						<p class="text-muted mb-4">
							A company incurs fixed and variable costs such as the purchase of raw materials,
							salaries and overhead, as explained by AccountingTools, Inc. Business owners have the
							discretion to determine the actions.
						</p>
						<div class="table-responsive table-card">
							<Table class="table table-borderless mb-0">
								<tbody>
									<tr>
										<td class="fw-medium">Industry Type</td>
										<td>Chemical Industries</td>
									</tr>
									<tr>
										<td class="fw-medium">Location</td>
										<td>Damascus, Syria</td>
									</tr>
									<tr>
										<td class="fw-medium">Employee</td>
										<td>10-50</td>
									</tr>
									<tr>
										<td class="fw-medium">Rating</td>
										<td>4.0 <i class="ri-star-fill text-warning align-bottom" /></td>
									</tr>
									<tr>
										<td class="fw-medium">Website</td>
										<td>
											<a href={null} class="link-primary text-decoration-underline"
												>www.syntycesolution.com</a
											>
										</td>
									</tr>
									<tr>
										<td class="fw-medium">Contact Email</td>
										<td>info@syntycesolution.com</td>
									</tr>
									<tr>
										<td class="fw-medium">Since</td>
										<td>1995</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</CardBody>
				</Card>
				<!--end card-->
			</Col>
			<!--end col-->
		</Row>
	</Container>
</div>
