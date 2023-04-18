<script>
	import DealType from './../../dashboard-crm/DealType.svelte';
	import { Col, Container, Row, Card, CardBody, Label } from 'sveltestrap';
	import BreadCrumb from '../../../Components/Common/BreadCrumb.svelte';

	import { onMount } from 'svelte';

	import { loadStripe } from '@stripe/stripe-js';
	import {
		Elements,
		PaymentElement,
		Address,
		CardNumber,
		CardCvc,
		CardExpiry,
		LinkAuthenticationElement
	} from 'svelte-stripe';
	import { goto } from '$app/navigation';
	import { saved_name } from '../../../stores.js';
	let store_glb_username = '';

	saved_name.subscribe((value) => (store_glb_username = value));


	let PUBLIC_STRIPE_KEY =
		'pk_test_51MSsFsJq03eCRPS3RPeuh3W4sN39UQCgAWq7hfV9CLTKpAPQ84EVGGeti8l69XFa40YDeOmA15S5tpXrjk4Uj0gu00PZWe3Vh0';
	let SECRET_STRIPE_KEY =
		'sk_test_51MSsFsJq03eCRPS3OHpuy17SRcHKPIiScRwrk23QdwKOt1dYcKYxBnVh9ciMMrbeb47vooudhtQ7ipfojSfEPEYJ00ieql6Nyh';
	let stripe = null;
	let clientSecret = null;
	let error = null;
	let elements;
	let processing = false;

	let stripe_price = '12$';
	let val_switch = false;

	onMount(async () => {

		document.cookie = "login_username=" + store_glb_username +"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None;  path=/; Secure";

		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		clientSecret = await createPaymentIntent();

		//console.log('stripe:' + JSON.stringify(stripe));
	});

	async function createPaymentIntent() {
		const response = await fetch('/pages/starter/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({})
		});
		const { clientSecret } = await response.json();

		return clientSecret;
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return;
		processing = true;
		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});
		// log results, for debugging
		console.log({ result });
		if (result.error) {
			// payment failed, notify user
			error = result.error;
			processing = false;
		} else {
			// payment succeeded
			//alert('success!!!');

			goto('/authenticationInner/successmessage/peerplays-nft-ops-transfer-token');
		}
	}

	function toggleSub() {
		val_switch = !val_switch;

		if (val_switch == false) {
			stripe_price = '12$';
		} else {
			stripe_price = '8$';
		}
	}
</script>

<svelte:head>
	<title>Starter | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Buy Token" pageTitle="Pages" />

		<Row>
			<Card class="card-h-100">
				<CardBody>
					<Col lg={6}>
						{#if error}
							<p class="error">{error.message} Please try again.</p>
						{/if}

						{#if stripe && clientSecret}
							<Elements
								{stripe}
								{clientSecret}
								theme="none"
								labels="floating"
								variables={{ colorPrimary: '#7c4dff' }}
								rules={{ '.Input': { border: 'solid 1px #0002' } }}
								bind:elements
							>
								<form on:submit|preventDefault={submit}>
									<div class="d-flex">
										<h5 class="fs-14 mb-0" style="line-height: 30px;">Monthly</h5>
										<div class="form-check form-switch fs-20 ms-3 " on:click={toggleSub}>
											<input class="form-check-input" type="checkbox" id="plan-switch" />
											<Label class="form-check-label" htmlfor="plan-switch" />
										</div>
									</div>

									<input
										type="text"
										bind:value={stripe_price}
										class="form-input mb-2 p-4"
										style="width:100%;line-height: 21px;border-radius:4px;border: 1px solid rgb(152, 166, 173)"
										disabled
									/>

									<LinkAuthenticationElement />
									<PaymentElement />
									<Address mode="billing" />

									<button class="btn btn-success mt-3 w-100" disabled={processing}>
										{#if processing}
											Processing...
										{:else}
											Pay
										{/if}
									</button>
								</form>
							</Elements>
						{:else}
							Loading...
						{/if}
					</Col>
				</CardBody>
			</Card>
		</Row>
	</Container>
</div>
