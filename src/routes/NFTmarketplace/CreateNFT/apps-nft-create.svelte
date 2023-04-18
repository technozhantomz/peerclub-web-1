<script>
	import { Card, CardBody, CardHeader, Col, Container, Form, Row, Label } from 'sveltestrap';
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';
</script>

<svelte:head>
	<title>Create Event | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Create Event" pageTitle="NFT Marketplace" />
		<Row>
			<Col lg={12}>
				<Card>
					<CardHeader>
						<h5 class="card-title mb-0">Create New Event</h5>
					</CardHeader>
					<CardBody>
						<Form>
							<Row class="g-3">
								<Col lg={12}>
									<h5 class="fw-semibold mb-3">Event Details</h5>
								</Col>
								<Col lg={12}>
									<Label htmlfor="productName" class="form-label">Event Name</Label>
									<input
										type="text"
										class="form-control"
										id="productName"
										placeholder="Enter event name"
									/>
								</Col>
								<Col lg={12}>
									<Label htmlfor="description" class="form-label">Description</Label>
									<textarea
										class="form-control"
										id="description"
										rows="3"
										placeholder="Enter description"
									/>
								</Col>
								<Col lg={12}>
									<Label htmlfor="externalLink" class="form-label">Event Start Time</Label>
									<input
										type="datetime-local"
										class="form-control"
										name="start"
										placeholder="Event Time"
										value={new Date()}
									/>
								</Col>
								<Col lg={12}>
									<Label htmlfor="externalLink" class="form-label">Location</Label>
									<input
										type="text"
										class="form-control"
										id="location"
										placeholder="Enter event location"
										value="BUNKER"
										disabled
									/>
								</Col>
								<Col lg={4}>
									<Label htmlfor="itemPrice" class="form-label">Item Price</Label>
									<input type="text" class="form-control" id="itemPrice" placeholder="Price" />
								</Col>
								<Col lg={4}>
									<Label htmlfor="size" class="form-label">Size</Label>
									<input type="text" class="form-control" id="size" placeholder="Size" />
								</Col>
								<Col lg={4}>
									<Label htmlfor="properties" class="form-label">Properties</Label>
									<input
										type="text"
										class="form-control"
										id="properties"
										placeholder="Properties"
									/>
								</Col>
								<Col lg={12}>
									<div>
										<div class="form-check form-check-inline">
											<input
												class="form-check-input"
												type="checkbox"
												id="inlineCheckbox1"
												value="option1"
											/>
											<Label class="form-check-label" htmlfor="inlineCheckbox1">Put on sale</Label>
										</div>
										<div class="form-check form-check-inline">
											<input
												class="form-check-input"
												type="checkbox"
												id="inlineCheckbox2"
												value="option2"
											/>
											<Label class="form-check-label" htmlfor="inlineCheckbox2"
												>Instant sale price</Label
											>
										</div>
										<div class="form-check form-check-inline">
											<input
												class="form-check-input"
												type="checkbox"
												id="inlineCheckbox3"
												value="option3"
											/>
											<Label class="form-check-label" htmlfor="inlineCheckbox3"
												>Unlock one purchased</Label
											>
										</div>
									</div>
								</Col>
								<Col lg={12}>
									<div class="text-end">
										<button class="btn btn-primary">Create Event</button>
									</div>
								</Col>
							</Row>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</div>
