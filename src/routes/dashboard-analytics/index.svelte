<script>
	import { Col, Container, Row } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';

	//import COmponents
	import UpgradeAccountNotise from './UpgradeAccountNotise.svelte';
	import UsersByDevice from './UsersByDevice.svelte';
	import Widget from './Widget.svelte';
	import AudiencesMetrics from './AudiencesMetrics.svelte';
	import AudiencesSessions from './AudiencesSessions.svelte';
	import LiveUsers from './LiveUsers.svelte';
	import TopReferrals from './TopReferrals.svelte';
	import TopPages from './TopPages.svelte';
	import Counter from '../../Components/Common/counter.svelte';
</script>

<svelte:head>
	<title>Analytics | Peer Club Dashboard</title>
</svelte:head>
<Counter />
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Analytics" pageTitle="Dashboards" />
		<Row>
			<Col xxl={5}>
				<UpgradeAccountNotise />
				<Widget />
			</Col>
			<LiveUsers />
		</Row>
		<Row>
			<AudiencesMetrics />
			<AudiencesSessions />
		</Row>
		<Row>
			<UsersByDevice />
			<TopReferrals />
			<TopPages />
		</Row>
	</Container>
</div>
