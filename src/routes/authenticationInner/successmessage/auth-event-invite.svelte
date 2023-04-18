<script>
	import Link from 'svelte-link';
	import { Card, CardBody, Col, Container, Row } from 'sveltestrap';
	import ParticlesAuth from '../ParticlesAuth.svelte';

	//import images
	import logoLight from '../../../assets/images/logo-light.png';

	import { page } from '$app/stores';

	import { server_url } from '../../../stores.js';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let store_server_url = get(server_url);

	const eventUUID = $page.url.searchParams.get('token');
	const emailForUser = $page.url.searchParams.get('id');
	const userUUID = $page.url.searchParams.get('user_id');
	const eventTitle = $page.url.searchParams.get('event_title');

	console.log('token: ' + eventUUID);
	console.log('id: ' + emailForUser);

	//const urlParams = new URLSearchParams(window.location.search);
	//const event_uuid = urlParams.has('token');

	//console.log(event_uuid);

	async function inviteEventUsers(event_uuid) {
		const res = await fetch(store_server_url + 'opsuserevent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_uuid: userUUID,
				event_uuid: eventUUID,
				is_admin: 'false',
				is_approved: '1',
				is_publisher: 'false',
				is_deleted: 'f',
				adminusername: 'admin',
				emailorusername: emailForUser,
				optype: 'upd'
			})
		});

		const result_json = await res.json();

		const result_string = JSON.stringify(result_json);
		console.log('result: ' + result_string);
	}

	onMount(inviteEventUsers());
</script>

<svelte:head>
	<title>Event Invite Approve | Homepesa Mega platform</title>
</svelte:head>
<div class="auth-page-wrapper">
	<ParticlesAuth>
		<div class="auth-page-content">
			<Container>
				<Row>
					<Col lg={12}>
						<div class="text-center mt-sm-5 mb-4 text-white-50">
							<div>
								<Link href="/dashboard" class="d-inline-block auth-logo">
									<img src={logoLight} alt="" height="20" />
								</Link>
							</div>
							<p class="mt-3 fs-15 fw-medium">Welcome to Homepesa Club</p>
						</div>
					</Col>
				</Row>

				<Row class="justify-content-center">
					<Col md={8} lg={6} xl={5}>
						<Card class="mt-4">
							<CardBody class="p-4 text-center">
								<div class="avatar-lg mx-auto mt-2">
									<div class="avatar-title bg-light text-success display-3 rounded-circle">
										<i class="ri-checkbox-circle-fill" />
									</div>
								</div>
								<div class="mt-4 pt-2">
									<h4>{eventTitle} <br /> Registration Success !</h4>
									<p class="text-muted mx-4">
										Aww yeah, you successfully joined the event.<br />Your event qr pass will be
										sent soon via email
									</p>
									<div class="mt-4">
										<Link
											href="/calendar/apps-showpassqr?token={eventUUID}&event_title={eventTitle}&user_id={userUUID}"
											class="btn btn-success w-100">Show Qr Pass</Link
										>
									</div>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	</ParticlesAuth>
</div>
