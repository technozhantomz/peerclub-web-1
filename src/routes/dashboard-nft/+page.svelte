<script>
	import { Col, Container, Row, Button, Toast, ToastBody, ToastHeader } from 'sveltestrap';
	import BreadCrumb from '../../Components/Common/BreadCrumb.svelte';
	import Widgets from './Widgets.svelte';
	import Marketplace from './Marketplace.svelte';
	import Popularity from './Popularity.svelte';
	import FeaturedEventsSwiper from './FeaturedEventsSwiper.svelte';
	import FeaturedNFT from './FeaturedNFT.svelte';
	import RecentNFTs from './RecentNFTs.svelte';
	import UserEventList from './UserEventList.svelte';
	import UserRequestList from './UserRequestList.svelte';
	import UserRequestReceivedList from './UserRequestReceivedList.svelte';

	import { onMount } from 'svelte';
	import { toasts, ToastContainer, BootstrapToast } from 'svelte-toasts';

	// /** @type {import('./$types').PageData} */
	//export let data;

	import { get } from 'svelte/store';
	import { server_nft_url } from '../../stores.js';

	let store_server_nft_url = get(server_nft_url);
	let tmp_replied_count = 0;

/*
	import { loadStripe } from '@stripe/stripe-js'
  	import { Elements, PaymentElement } from 'svelte-stripe'
	let PUBLIC_STRIPE_KEY = 'pk_test_51MSsFsJq03eCRPS3RPeuh3W4sN39UQCgAWq7hfV9CLTKpAPQ84EVGGeti8l69XFa40YDeOmA15S5tpXrjk4Uj0gu00PZWe3Vh0';
	let SECRET_STRIPE_KEY = 'sk_test_51MSsFsJq03eCRPS3OHpuy17SRcHKPIiScRwrk23QdwKOt1dYcKYxBnVh9ciMMrbeb47vooudhtQ7ipfojSfEPEYJ00ieql6Nyh';
	let clientSecret = 'sk_test_51MSsFsJq03eCRPS3OHpuy17SRcHKPIiScRwrk23QdwKOt1dYcKYxBnVh9ciMMrbeb47vooudhtQ7ipfojSfEPEYJ00ieql6Nyh';
	let stripe = null;
*/
	onMount(async () => {
		//
		//stripe = await loadStripe(PUBLIC_STRIPE_KEY);

	});

	//console.log("stripe:" + stripe);

	//const defaultnotify = () => toast("Welcome Back! This is a Toast Notification", { position: "top-right", hideProgressBar: true, class: 'bg-primary text-white' });

	async function getEventMetadata() {
		//peerclubEvents = null;

		const res = await fetch(store_server_nft_url + 'getnftfulldata', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nft_detail_id_start: '0',
				nft_detail_id_end: '9999999999',
				rec_limit: '10',
				start_date_time_epoch: '1671992077',
				end_date_time_epoch: '9999999999',
				account_id: '624',
				event_name_substr: ''
			})
		});

		const result_json = await res.json();
		//console.log('result_data_size: ' + result_json.length);

		let replied_count = 0;

		for (let i = 0; i < result_json.length; i++) {
			if (JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined && JSON.parse(result_json[i].token_uri_2).prj_data_type == "PCL-NFM-1") {
				//console.log("count: " +JSON.parse(result_json[i].token_uri_2).replied.length);
				replied_count = replied_count + JSON.parse(result_json[i].token_uri_2).replied.length;
			}
		}
		if (tmp_replied_count == 0) {
			tmp_replied_count = replied_count;
			return;
		}

		if (tmp_replied_count != replied_count) {
			defaultnotify('Invitation replied!');
			tmp_replied_count = replied_count;
		}

		//console.log("tmp_count: " +tmp_replied_count);
	}

	setInterval(getEventMetadata, 10000);

	//getEventMetadata();

	const defaultnotify = (desc) => {
		const toast = toasts.add({
			title: '',
			description: desc,
			duration: 10000, // 0 or negative to avoid auto-remove
			placement: 'top-right',
			class: 'bg-primary text-white',
			type: 'info',
			theme: 'dark'
		});
	};
</script>

<svelte:head>
	<title>Membership | Homepesa Mega Platform</title>
</svelte:head>
<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Homepesa Mega Platform" pageTitle="Dashboard" />
		<Row class="dash-nft">
			<Col xxl={9}>
				<Widgets />
				<Marketplace />
			</Col>
			<!--
			<Popularity />
			-->
		</Row>

		<UserRequestList />
		<UserRequestReceivedList />
		<FeaturedEventsSwiper />
		<UserEventList />

		<FeaturedNFT />
		<!--		<RecentNFTs />
			-->

		<ToastContainer let:data>
			<BootstrapToast {data} />
		</ToastContainer>
	</Container>
</div>
