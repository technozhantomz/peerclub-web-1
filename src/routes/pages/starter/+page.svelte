<script>
	import { Col, Container, Row, Card, CardBody } from 'sveltestrap';
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
	let PUBLIC_STRIPE_KEY =
		'pk_test_51MSsFsJq03eCRPS3RPeuh3W4sN39UQCgAWq7hfV9CLTKpAPQ84EVGGeti8l69XFa40YDeOmA15S5tpXrjk4Uj0gu00PZWe3Vh0';
	let SECRET_STRIPE_KEY =
		'sk_test_51MSsFsJq03eCRPS3OHpuy17SRcHKPIiScRwrk23QdwKOt1dYcKYxBnVh9ciMMrbeb47vooudhtQ7ipfojSfEPEYJ00ieql6Nyh';
	let stripe = null;
	let clientSecret = null;
	let error = null;
	let elements;
	let processing = false;

	onMount(async () => {
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
			// payment succeeded, redirect to "thank you" page
			alert('success!!!');
		}
	}
</script>

<svelte:head>
	<title>Starter | Peer Club Dashboard</title>
</svelte:head>

<div class="page-content">
	<Container fluid>
		<BreadCrumb title="Starter" pageTitle="Pages" />

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
