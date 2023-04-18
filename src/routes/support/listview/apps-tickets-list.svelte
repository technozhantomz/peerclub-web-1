<script>
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';
	import Counter from '../../../Components/Common/counter.svelte';
	import tickitData from '../../../common/data/supportTickets';
	import Widgets from './Widgets.svelte';
	import TicketsData from './TicketsData.svelte';

	import { Row, Container } from 'sveltestrap';
</script>

<svelte:head>
	<title>Tickets List | Peer Club Dashboard</title>
</svelte:head>

<Counter />

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Invoice List" pageTitle="Invoices" />

		<Row>
			<Widgets ticketsWidgets={tickitData.ticketsWidgets} />
		</Row>

		<TicketsData ticketsTable={tickitData.ticketsTable} />
	</Container>
</div>
