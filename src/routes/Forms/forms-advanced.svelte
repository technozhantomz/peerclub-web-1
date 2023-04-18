<script>
	import { Card, CardBody, CardHeader, Col, Container, Input, Row } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';

	let defaultCounter = 5;
	let lightCounter = 5;
	let fullwidthCounter = 5;
	let lfullwidthCounter = 5;
	let blueCounter = 5;
	let skyCounter = 5;
	let greenCounter = 5;
	let tealCounter = 5;
	let yellowCounter = 5;
	let redCounter = 5;
</script>

<svelte:head>
	<title>Form Advanced | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Form Advanced" pageTitle="Forms" />
		<Row>
			<Col lg={12}>
				<Card>
					<CardHeader>
						<h4 class="card-title mb-0">Form Input Spin</h4>
					</CardHeader>

					<CardBody>
						<div>
							<Row class="gy-4">
								<Col sm={6}>
									<div>
										<h5 class="fs-13 fw-medium text-muted">Default</h5>
										<div class="input-step">
											<button
												type="button"
												class="minus"
												on:click={() => {
													defaultCounter--;
												}}
											>
												–
											</button>
											<Input
												type="number"
												class="product-quantity"
												value={defaultCounter}
												min="0"
												max="100"
												readOnly
											/>
											<button
												type="button"
												class="plus"
												on:click={() => {
													defaultCounter++;
												}}
											>
												+
											</button>
										</div>
									</div>
								</Col>

								<Col sm={6}>
									<div>
										<h5 class="fs-13 fw-medium text-muted">Light</h5>
										<div class="input-step light">
											<button
												type="button"
												class="minus"
												on:click={() => {
													lightCounter--;
												}}
											>
												–
											</button>
											<Input
												type="number"
												class="product-quantity"
												value={lightCounter}
												min="0"
												max="100"
												readOnly
											/>
											<button
												type="button"
												class="plus"
												on:click={() => {
													lightCounter++;
												}}
											>
												+
											</button>
										</div>
									</div>
								</Col>
							</Row>

							<div class="mt-4 pt-2">
								<Row class="gy-4">
									<Col sm={6}>
										<div>
											<h5 class="fs-13 fw-medium text-muted">Default (Full width)</h5>
											<div class="input-step full-width">
												<button
													type="button"
													class="minus"
													on:click={() => {
														fullwidthCounter--;
													}}
												>
													–
												</button>
												<Input
													type="number"
													class="product-quantity"
													value={fullwidthCounter}
													min="0"
													max="100"
													readOnly
												/>
												<button
													type="button"
													class="plus"
													on:click={() => {
														fullwidthCounter++;
													}}
												>
													+
												</button>
											</div>
										</div>
									</Col>

									<Col sm={6}>
										<div>
											<h5 class="fs-13 fw-medium text-muted">Light (Full width)</h5>
											<div class="input-step full-width light">
												<button
													type="button"
													class="minus"
													on:click={() => {
														lfullwidthCounter--;
													}}
												>
													–
												</button>
												<Input
													type="number"
													class="product-quantity"
													value={lfullwidthCounter}
													min="0"
													max="100"
													readOnly
												/>
												<button
													type="button"
													class="plus"
													on:click={() => {
														lfullwidthCounter++;
													}}
												>
													+
												</button>
											</div>
										</div>
									</Col>
								</Row>
							</div>

							<Row class="mt-4 pt-2">
								<h5 class="fs-13 fw-medium text-muted">Colored</h5>
								<div class="d-flex flex-wrap align-items-start gap-2">
									<div class="input-step step-primary">
										<button
											type="button"
											class="minus"
											on:click={() => {
												blueCounter--;
											}}
										>
											–
										</button>
										<Input
											type="number"
											class="product-quantity"
											value={blueCounter}
											min="0"
											max="100"
											readOnly
										/>
										<button
											type="button"
											class="plus"
											on:click={() => {
												blueCounter++;
											}}
										>
											+
										</button>
									</div>
									<div class="input-step step-secondary">
										<button
											type="button"
											class="minus"
											on:click={() => {
												skyCounter--;
											}}
										>
											–
										</button>
										<Input
											type="number"
											class="product-quantity"
											value={skyCounter}
											min="0"
											max="100"
											readOnly
										/>
										<button
											type="button"
											class="plus"
											on:click={() => {
												skyCounter++;
											}}
										>
											+
										</button>
									</div>
									<div class="input-step step-success">
										<button
											type="button"
											class="minus"
											on:click={() => {
												greenCounter--;
											}}
										>
											–
										</button>
										<Input
											type="number"
											class="product-quantity"
											value={greenCounter}
											min="0"
											max="100"
											readOnly
										/>
										<button
											type="button"
											class="plus"
											on:click={() => {
												greenCounter++;
											}}
										>
											+
										</button>
									</div>
									<div class="input-step step-info">
										<button
											type="button"
											class="minus"
											on:click={() => {
												tealCounter--;
											}}
										>
											–
										</button>
										<Input
											type="number"
											class="product-quantity"
											value={tealCounter}
											min="0"
											max="100"
											readOnly
										/>
										<button
											type="button"
											class="plus"
											on:click={() => {
												tealCounter++;
											}}
										>
											+
										</button>
									</div>
									<div class="input-step step-warning">
										<button
											type="button"
											class="minus"
											on:click={() => {
												yellowCounter--;
											}}
										>
											–
										</button>
										<Input
											type="number"
											class="product-quantity"
											value={yellowCounter}
											min="0"
											max="100"
											readOnly
										/>
										<button
											type="button"
											class="plus"
											on:click={() => {
												yellowCounter++;
											}}
										>
											+
										</button>
									</div>
									<div class="input-step step-danger">
										<button
											type="button"
											class="minus"
											on:click={() => {
												redCounter--;
											}}
										>
											–
										</button>
										<Input
											type="number"
											class="product-quantity"
											value={redCounter}
											min="0"
											max="100"
											readOnly
										/>
										<button
											type="button"
											class="plus"
											on:click={() => {
												redCounter++;
											}}
										>
											+
										</button>
									</div>
								</div>
							</Row>
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</div>
