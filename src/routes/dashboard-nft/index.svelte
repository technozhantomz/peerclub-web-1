<script>
	import { Col, Container, Row } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import Widgets from './Widgets.svelte';
	import Marketplace from './Marketplace.svelte';
	import Popularity from './Popularity.svelte';
	import FeaturedNFT from './FeaturedNFT.svelte';
	import RecentNFTs from './RecentNFTs.svelte';


</script>

<svelte:head>
	<title>NFT Membership | Peer Club Dashboard</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Peer Club Dashboard" pageTitle="Dashboard" />
		<Row class="dash-nft">
			<Col xxl={9}>
				<Widgets />
				<Marketplace />
			</Col>
			<Popularity />
		</Row>
		<FeaturedNFT />
		<RecentNFTs />
	</Container>
</div>
