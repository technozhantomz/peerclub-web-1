<script>
	import { Col, Container, Row } from 'sveltestrap';
	import Link from 'svelte-link';

	export let event_data;
	import 'add-to-calendar-button';
	import {
		Email,
		HackerNews,
		Reddit,
		LinkedIn,
		Pinterest,
		Telegram,
		Tumblr,
		Vk,
		WhatsApp,
		Xing,
		Facebook,
		Twitter,
		Line
	} from 'svelte-share-buttons-component';

	let isVideo = false;

	const url = event_data.web_url;
	const title = event_data.title;
	const desc = event_data.description;

	if(event_data.bg_img.includes("mp4")){

		isVideo = true;
	}

	//console.log(JSON.stringify(event_data));
</script>

<section
	class="section nft-hero"
	style="background-image: url(/src/assets/images/landing/bg/{event_data.bg_img});background-size: cover;background-position: bottom;padding: 222px 0 150px 0;"
	id="hero"
>


{#if !!isVideo}
<video id="background-video" style="position: absolute;width:100%;height:100%;top:0; object-fit: fill;" autoplay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
<source src="/src/assets/images/landing/bg/{event_data.bg_img}" type="video/mp4">
</video>
{/if}


	<div class="bg-overlay" />
	<Container>
		<Row class="justify-content-center">
			<Col lg={8} sm={10}>
				<div class="text-center">
					<h1 class="display-4 fw-medium mb-4 lh-base text-white">
						{event_data.title}
					</h1>
					<p class="lead text-white-50 lh-base mb-4 pb-2">
						{event_data.description}
					</p>

					<div class="hstack gap-2 justify-content-center">
						<add-to-calendar-button
							name={event_data.title}
							startDate={event_data.start.split('T')[0]}
							timeZone="America/Los_Angeles"
							location={event_data.location}
							description="{event_data.description} [br]→ [url]{event_data.web_url}"
							options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
							lightMode="light"
							hideBackground="true"
							size="4"
							buttonStyle="3d"
						/>
						<Link href="/NFTmarketplace/CreateNFT/apps-nft-create" class="btn btn-primary"
							>Create Own <i class="ri-arrow-right-line align-middle ms-1" /></Link
						>
						<Link href="/NFTmarketplace/ExploreNow/apps-nft-explore" class="btn btn-danger"
							>Explore Now <i class="ri-arrow-right-line align-middle ms-1" /></Link
						>
					</div>
					<div class="mt-4 hstack gap-2 justify-content-center">
						<Email class="share-button share-radius" subject={title} body="{desc} {url}" />
						<Telegram class="share-button share-radius" text={title} {url} />
						<WhatsApp class="share-button share-radius" text="{title} {url}" />
						<Facebook class="share-button share-radius" quote={title} {url} />
						<Twitter
							class="share-button share-radius"
							text={title}
							{url}
							hashtags="github,svelte"
							via="username"
							related="other,users"
						/>
						<Line class="share-button share-radius" {url} />
						<Reddit class="share-button share-radius" {title} {url} />
						<LinkedIn class="share-button share-radius" {url} />

					</div>
				</div>
			</Col>
		</Row>
	</Container>
</section>
