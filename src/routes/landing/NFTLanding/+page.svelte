<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Navbar from './navbar.svelte';
	import Home from './home.svelte';
	import Connect from './Connect.svelte';
	import Products from './Products.svelte';
	import Features from './Features.svelte';
	import Trending from './Trending.svelte';
	import DiscoverItems from './DiscoverItems.svelte';
	import TopCreator from './TopCreator.svelte';
	import CTA from './CTA.svelte';
	import Footer from './footer.svelte';

	import { get } from 'svelte/store';
	import { server_nft_url } from '../../../stores.js';
	let store_server_nft_url = get(server_nft_url);

	onMount(() => {
		if (browser) {
			window.onscroll = function () {
				scrollFunction();
			};
		}
	});

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


		for (let i = 0; i < result_json.length; i++) {
			if (JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined) {
				//console.log("count: " +JSON.parse(result_json[i].token_uri_2).replied.length);
			}
		}
		

		//console.log("tmp_count: " +tmp_replied_count);
	}


	const scrollFunction = () => {
		const element = document.getElementById('back-to-top');
		if (element) {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				element.style.display = 'block';
			} else {
				element.style.display = 'none';
			}
		}
	};

	const toTop = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};
</script>

<div class="layout-wrapper landing">
	<Navbar />
	<Home />
	<Connect />
	<Products />
	<Features />
	<Trending />
	<DiscoverItems />
	<TopCreator />
	<CTA />
	<Footer />
	<button
		on:click={() => toTop()}
		class="btn btn-danger btn-icon landing-back-top"
		id="back-to-top"
	>
		<i class="ri-arrow-up-line" />
	</button>
</div>
