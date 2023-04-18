<script>
	import { Col, Container, Row } from 'sveltestrap';
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';
</script>

<svelte:head>
	<title>Starter | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Starter" pageTitle="Pages" />
		<Row>
			<Col xs={12} />
		</Row>
	</Container>
</div>
