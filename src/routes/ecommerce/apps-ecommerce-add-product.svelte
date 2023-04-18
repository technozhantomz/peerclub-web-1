<script>
	import {
		Card,
		CardBody,
		Col,
		Container,
		CardHeader,
		Nav,
		NavItem,
		NavLink,
		Row,
		TabContent,
		TabPane,
		Input,
		Label
	} from 'sveltestrap';
	import Link from 'svelte-link';
	import Select from 'svelte-select';
	import Flatpickr from 'svelte-flatpickr';

	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Dropzone from 'svelte-file-dropzone';
	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	let customActiveTab = 1;

	const options = [
		{ value: 'Published', label: 'Published' },
		{ value: 'Scheduled', label: 'Scheduled' },
		{ value: 'Draft', label: 'Draft' }
	];

	const optionvisibility = [
		{ value: 'Public', label: 'Public' },
		{ value: 'Hidden', label: 'Hidden' }
	];

	const optioncategory = [
		{ value: 'All', label: 'All' },
		{ value: 'Appliances', label: 'Appliances' },
		{ value: 'Fashion', label: 'Fashion' },
		{ value: 'Electronics', label: 'Electronics' },
		{ value: 'Grocery', label: 'Grocery' },
		{ value: 'Home & Furniture', label: 'Home & Furniture' },
		{ value: 'Kids', label: 'Kids' },
		{ value: 'Mobiles', label: 'Mobiles' }
	];

	const tags = [
		{ value: 'All', label: 'All' },
		{ value: 'Product', label: 'Product' },
		{ value: 'Sale', label: 'Sale' },
		{ value: 'Cotton', label: 'Cotton' }
	];
</script>

<svelte:head>
	<title>Add Product | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Create Product" pageTitle="Ecommerce" />

		<Row>
			<Col lg={8}>
				<form>
					<Card>
						<CardBody>
							<div class="mb-3">
								<Label class="form-label" for="product-title-input">Product Title</Label>
								<Input
									type="text"
									class="form-control"
									id="product-title-input"
									placeholder="Enter product title"
								/>
							</div>
							<div class="mb-3">
								<Editor />
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<h5 class="card-title mb-0">Product Gallery</h5>
						</CardHeader>
						<CardBody>
							<div class="mb-4">
								<h5 class="fs-15 mb-1">Product Image</h5>
								<p class="text-muted">Add Product main Image.</p>
								<div class="text-center">
									<div class="position-relative d-inline-block">
										<div class="position-absolute top-100 start-100 translate-middle">
											<Label
												for="product-image-input"
												class="mb-0"
												data-bs-toggle="tooltip"
												data-bs-placement="right"
												title="Select Image"
											>
												<div class="avatar-xs">
													<div
														class="avatar-title bg-light border rounded-circle text-muted cursor-pointer"
													>
														<i class="ri-image-fill" />
													</div>
												</div>
											</Label>
											<input
												class="form-control d-none"
												value=""
												id="product-image-input"
												type="file"
												accept="image/png, image/gif, image/jpeg"
											/>
										</div>
										<div class="avatar-lg">
											<div class="avatar-title bg-light rounded">
												<img src="" id="product-img" alt="" class="avatar-md h-auto" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<h5 class="fs-15 mb-1">Product Gallery</h5>
								<p class="text-muted">Add Product Gallery Images.</p>
								<Dropzone on:drop={handleFilesSelect}>
									<div>
										<div class="dz-message needsclick">
											<div class="dz-message needsclick">
												<div class="mb-3">
													<i class="display-4 text-muted bx bxs-cloud-upload" />
												</div>
												<h4>Drop files here or click to upload.</h4>
											</div>
										</div>
									</div>
								</Dropzone>
								<div class="dropzone-previews mt-3" id="file-previews">
									{#each files.accepted as item}
										<Card
											class="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
										>
											<div class="p-2">
												<Row class="align-items-center">
													<Col>
														<Link href="" class="text-muted font-weight-bold">
															{item.name}
														</Link>
														<p class="mb-0">
															<strong>{item.size}</strong>
														</p>
													</Col>
												</Row>
											</div>
										</Card>
									{/each}
								</div>
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader>
							<Nav class="nav-tabs-custom card-header-tabs border-bottom-0">
								<NavItem>
									<NavLink
										style="cursor: pointer"
										href=""
										on:click={() => (customActiveTab = 1)}
										active={customActiveTab == 1}>General Info</NavLink
									>
								</NavItem>
								<NavItem>
									<NavLink
										style="cursor: pointer"
										href=""
										on:click={() => (customActiveTab = 2)}
										active={customActiveTab == 2}>Meta Data</NavLink
									>
								</NavItem>
							</Nav>
						</CardHeader>

						<CardBody>
							<TabContent>
								<TabPane tabId={1} class={customActiveTab == 1 ? 'active' : ''}>
									<div class="mb-3">
										<Label class="form-label" for="manufacturer-name-input">
											Manufacturer Name
										</Label>
										<Input
											type="text"
											class="form-control"
											id="manufacturer-name-input"
											placeholder="Enter manufacturer name"
										/>
									</div>
									<Row>
										<Col lg={6}>
											<div class="mb-3">
												<Label class="form-label" for="manufacturer-brand-input">
													Manufacturer Brand
												</Label>
												<Input
													type="text"
													class="form-control"
													id="manufacturer-brand-input"
													placeholder="Enter manufacturer brand"
												/>
											</div>
										</Col>

										<Col lg={6}>
											<Row>
												<Col sm={6}>
													<div class="mb-3">
														<Label class="form-label" for="product-price-input">Price</Label>
														<div class="input-group mb-3">
															<span class="input-group-text" id="product-price-addon"> $ </span>
															<Input
																type="text"
																class="form-control"
																id="product-price-input"
																placeholder="Enter price"
																aria-label="Price"
																aria-describedby="product-price-addon"
															/>
														</div>
													</div>
												</Col>
												<Col sm={6}>
													<div class="mb-3">
														<Label class="form-label" for="product-discount-input">Discount</Label>
														<div class="input-group mb-3">
															<span class="input-group-text" id="product-discount-addon"> % </span>
															<Input
																type="text"
																class="form-control"
																id="product-discount-input"
																placeholder="Enter discount"
																aria-label="discount"
																aria-describedby="product-discount-addon"
															/>
														</div>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
								</TabPane>

								<TabPane tabId={2} class={customActiveTab == 2 ? 'active' : ''}>
									<Row>
										<Col lg={6}>
											<div class="mb-3">
												<Label class="form-label" for="meta-title-input">Meta title</Label>
												<Input
													type="text"
													class="form-control"
													placeholder="Enter meta title"
													id="meta-title-input"
												/>
											</div>
										</Col>

										<Col lg={6}>
											<div class="mb-3">
												<Label class="form-label" for="meta-keywords-input">Meta Keywords</Label>
												<Input
													type="text"
													class="form-control"
													placeholder="Enter meta keywords"
													id="meta-keywords-input"
												/>
											</div>
										</Col>
									</Row>

									<div>
										<Label class="form-label" for="meta-description-input">Meta Description</Label>
										<Input
											type="textarea"
											class="form-control"
											id="meta-description-input"
											placeholder="Enter meta description"
											rows="3"
										/>
									</div>
								</TabPane>
							</TabContent>
						</CardBody>
					</Card>

					<div class="text-end mb-3">
						<button type="submit" class="btn btn-success w-sm"> Submit </button>
					</div>
				</form>
			</Col>
			<Col lg={4}>
				<Card>
					<CardHeader>
						<h5 class="card-title mb-0">Publish</h5>
					</CardHeader>
					<CardBody>
						<div class="mb-3">
							<Label for="choices-publish-status-input" class="form-label">Status</Label>

							<Select
								class="form-select"
								placeholder="Choose ..."
								title="features"
								items={options}
							/>
						</div>

						<div>
							<Label for="choices-publish-visibility-input" class="form-label">Visibility</Label>
							<Select class="form-select" title="features" items={optionvisibility} />
						</div>
					</CardBody>
					<!-- end card body -->
				</Card>
				<!-- end card -->

				<div class="card">
					<CardHeader>
						<h5 class="card-title mb-0">Publish Schedule</h5>
					</CardHeader>
					<!-- end card body -->
					<CardBody>
						<div>
							<Label for="datepicker-publish-input" class="form-label">Publish Date & Time</Label>
							<Flatpickr
								class="form-control"
								placeholder="Enter publish date"
								options={{
									mode: 'range',
									dateFormat: 'd M, Y',
									defaultDate: ['01 Jan 2022', '31 Jan 2022']
								}}
							/>
						</div>
					</CardBody>
				</div>
				<!-- end card -->

				<div class="card">
					<CardHeader>
						<h5 class="card-title mb-0">Product Categories</h5>
					</CardHeader>
					<CardBody>
						<p class="text-muted mb-2">
							<a href={null} class="float-end text-decoration-underline">Add New</a>Select product
							category
						</p>

						<Select
							class="form-select"
							title="features"
							name="choices-category-input"
							items={optioncategory}
						/>
					</CardBody>
					<!-- end card body -->
				</div>
				<!-- end card -->
				<div class="card">
					<CardHeader>
						<h5 class="card-title mb-0">Product Tags</h5>
					</CardHeader>
					<CardBody>
						<div class="hstack gap-3 align-items-start">
							<div class="flex-grow-1">
								<Select items={tags} isMulti={true} />
							</div>
						</div>
					</CardBody>
					<!-- end card body -->
				</div>
				<!-- end card -->

				<div class="card">
					<CardHeader>
						<h5 class="card-title mb-0">Product Short Description</h5>
					</CardHeader>
					<CardBody>
						<p class="text-muted mb-2">Add short description for product</p>
						<textarea
							class="form-control"
							placeholder="Must enter minimum of a 100 characters"
							rows="3"
						/>
					</CardBody>
					<!-- end card body -->
				</div>
				<!-- end card -->
			</Col>
		</Row>
	</Container>
</div>
