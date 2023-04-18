<script>
	import BreadCrumb from './../../../../Components/Common/BreadCrumb.svelte';
	import { Container } from 'sveltestrap';
	import InvoiceAction from './InvoiceAction.svelte';
	import FeedbackAction from './FeedbackAction.svelte';
	import RatingTemplate from './RatingTemplate.svelte';
</script>

<svelte:head>
	<title>Ecommerce Action | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Ecommerce Action" pageTitle="Email" />
		<InvoiceAction />
		<FeedbackAction />
		<RatingTemplate />
	</Container>
</div>
