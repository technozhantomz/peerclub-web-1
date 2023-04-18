<script>
	import Map from '../../Components/Common/Map.svelte';
	import { Card, CardBody, CardHeader, Col, Container, Row } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
</script>

<svelte:head>
	<title>Google Maps | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Google Maps" pageTitle="Maps" />

		<Row>
			<Col lg={6}>
				<Card>
					<CardHeader>
						<h4 class="card-title mb-0">Markers</h4>
					</CardHeader>
					<CardBody>
						<div style="height: 269px">
							<<Map latitude={-34.397} longitude={150.644} />
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container>
</div>
