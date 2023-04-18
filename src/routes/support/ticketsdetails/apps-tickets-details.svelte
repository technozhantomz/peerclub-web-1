<script>
	import { Container, Row } from 'sveltestrap';

	import Section from './Section.svelte';
	import TicketDescription from './TicketDescription.svelte';
	import TicketDetails from './TicketDetails.svelte';
</script>

<svelte:head>
	<title>Ticket Details | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<Row>
			<Section />
		</Row>
		<Row>
			<TicketDescription />
			<TicketDetails />
		</Row>
	</Container>
</div>
