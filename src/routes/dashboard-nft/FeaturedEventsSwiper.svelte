<script>
	import { Card, CardBody, Col, Row } from 'sveltestrap';
	import { Navigation, Autoplay } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import Link from 'svelte-link';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'swiper/css/navigation';
	import 'swiper/css/scrollbar';
	import 'swiper/css/effect-fade';
	import 'swiper/css/effect-flip';
	import 'swiper/css/autoplay';
	import data from '../../common/data/dashboardNFT';
	import TopArtworkChart from './TopArtworkChart.svelte';

	import { get } from 'svelte/store';
	import { server_nft_url } from '../../stores.js';
	import QRCode from '../../qrjs2.svelte';

	let store_server_nft_url = get(server_nft_url);
	let arrEvents = [];

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
		console.log('result_data_size: ' + result_json.length);

		let arrEventsTmp = [];
		//let eventObj = JSON.parse(result_json[28].token_uri_2);
		//arrEvents.push(eventObj);

		for (let i = 0; i < result_json.length; i++) {
			if (JSON.parse(result_json[i].token_uri_2).prj_data_type != undefined) {
				arrEventsTmp.push(JSON.parse(result_json[i].token_uri_2));
				console.log(JSON.stringify(JSON.parse(result_json[i].token_uri_2).invited));
			}
			//console.log(JSON.parse(result_json[i].token_uri_2).invited);
		}

		arrEvents = arrEventsTmp;
	}

	getEventMetadata();
</script>

<Row>
	<Col xxl={8}>
		<div class="d-flex pt-2 pb-4">
			<h5 class="card-title fs-18 mb-0">Featured Event NFTs</h5>
		</div>
		<Swiper
			modules={[Navigation, Autoplay]}
			slidesPerView={1}
			spaceBetween={10}
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 24
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 24
				}
			}}
			loop={false}
			autoplay={{ delay: 2500, disableOnInteraction: false }}
			className="mySwiper marketplace-swiper rounded gallery-light pt-5"
		>
			{#each arrEvents as item}
				<SwiperSlide>
					<div class="card explore-box card-animate rounded">
						<div class="bookmark-icon position-absolute top-0 end-0 p-2">
							<button
								type="button"
								class="btn btn-icon active"
								data-bs-toggle="button"
								aria-pressed="true"><i class="mdi mdi-cards-heart fs-16" /></button
							>
						</div>
						<div class="explore-place-bid-img">
							<QRCode
								codeValue="https://peerclub.peerplays.com/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id={item.id}"
								squareSize="200"
								divId={item.id}
							/>
							<div class="bg-overlay" />
							<div class="place-bid-btn">
								<Link href="" class="btn btn-success"
									><i class="ri-auction-fill align-bottom me-1" /> Place Bid</Link
								>
							</div>
						</div>
						<CardBody>
							<p class="fw-medium mb-0 float-end">
								<i class="mdi mdi-heart text-danger align-middle" />
								5
							</p>
							<h5 class="mb-1">
								<Link href="/NFTmarketplace/Itemdetails/apps-nft-item-details?event_id={item.id}">{item.title}</Link>
							</h5>
							<p class="text-muted mb-0">{item.description}</p>
						</CardBody>
						<div class="card-footer border-top border-top-dashed">
							<div class="d-flex align-items-center">
								<div class="flex-grow-1 fs-14">
									<i class="ri-price-tag-3-fill text-warning align-bottom me-1" />
									Highest:
									<span class="fw-medium">10 KSH</span>
								</div>
								<h5 class="flex-shrink-0 fs-14 text-primary mb-0">
									5 KSH
								</h5>
							</div>
						</div>
					</div>
				</SwiperSlide>
			{/each}
		</Swiper>
	</Col>
</Row>
