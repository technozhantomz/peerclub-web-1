<script>
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import { Container } from 'sveltestrap';
	import data from '../../common/data/projectList';
	import List from './List.svelte';
</script>

<svelte:head>
	<title>Product List | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Project List" pageTitle="Projects" />

		<List projectList={data.projectList} />
	</Container>
</div>
