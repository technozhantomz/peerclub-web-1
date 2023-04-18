<script>
	import { Container } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import TileBoxs from './TileBoxs.svelte';
	import OtherWidgets from './OtherWidgets.svelte';
	import UpcomingActivity from './UpcomingActivities.svelte';
	import ChartMapWidgets from './Chart&MapWidgets.svelte';
	import WidgetData from '../../common/data/widgets';
</script>

<svelte:head>
	<title>Widget | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Widgets" pageTitle="Peer Club" />
		<TileBoxs {WidgetData} />

		<OtherWidgets otherWidgets2={WidgetData.otherWidgets2} />

		<UpcomingActivity
			widgetsActivities={WidgetData.widgetsActivities}
			widgetsTasks={WidgetData.widgetsTasks}
		/>

		<ChartMapWidgets
			widgetsAudiences={WidgetData.widgetsAudiences}
			widgetsPortfolio={WidgetData.widgetsPortfolio}
		/>
	</Container>
</div>
