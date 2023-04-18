<script>
	import { Container, Row, Col, Card, CardBody, Label } from 'sveltestrap';
	import Link from 'svelte-link';
	import ParticlesAuth from '../ParticlesAuth.svelte';
	import logolight from '../../../assets/images/logo-light.png';

	import { goto } from '$app/navigation';
	import { glb_username } from '../../../stores.js';
	import { server_url } from '../../../stores.js';
	import { server_sso_url } from '../../../stores.js';
	import { login_user_uuid } from '../../../stores.js';
	import { get } from 'svelte/store';

	glb_username.set('');

	let store_server_url = get(server_url);
	let store_server_sso_url = get(server_sso_url);
	let lcl_username = '';
	let lcl_password = '';

	async function loginClick(arg1, arg2) {
		const response = await fetch(store_server_sso_url + 'auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: lcl_username,
				password: lcl_password
			})
		});

		console.log('r status: ' + response.status);
		if (response.status === 200) {
			//return await response.json();
			// ??? const result_json = await response.json();
			glb_username.set(lcl_username);
			goto('/dashboard-nft/');
			//TODOgetUserDataFromDB();
		} else {
			// TODO WRONG USER!!
			glb_username.set('');
			alert('Please check username and password!');
			throw new Error(response.statusText);
		}

		console.log('lcl_username' + lcl_username);

		//result = JSON.stringify(json);
		//console.log("result: " + result);

		// throw redirect(307, '/dashboard-nft/');
		// goto('/dashboard-nft/');

		//Response.redirect('/dashboard', 303);
		/*return {
			headers: {Location: '/dashboard'},
                status: 302
            };
			*/
	}

	async function getUserDataFromDB() {
		const response = await fetch(store_server_url + 'getuserlogin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: lcl_username,
				userpass: lcl_password
			})
		});

		//console.log("r status: " + response.status);
		if (response.status === 200) {
			const result_json = await response.json();
			console.log('qwerty ' + result_json[0].user_uuid);
			login_user_uuid.set(result_json[0].user_uuid);
			glb_username.set(lcl_username);
			goto('/dashboard-nft/');
		}
	}
	function abc(arg1, argv2) {
		alert('value1: ' + arg1);

		return {
			status: 302,
			redirect: '/dashboard-nft/'
		};
	}
</script>

<svelte:head>
	<title>Sign In | Homepesa Mega Platform</title>
</svelte:head>
<ParticlesAuth>
	<div class="auth-page-content">
		<Container>
			<Row>
				<Col lg={12}>
					<div class="text-center mt-sm-5 mb-4 text-white-50">
						<div>
							<Link href="index" class="d-inline-block auth-logo">
								<img src={logolight} alt="" height="20" />
							</Link>
						</div>
						<p class="mt-3 fs-15 fw-medium">Welcome to Homepesa Club</p>
					</div>
				</Col>
			</Row>
			<!-- end row -->

			<Row class="justify-content-center">
				<Col md={8} lg={6} xl={5}>
					<Card class="mt-4">
						<CardBody class="p-4">
							<div class="text-center mt-2">
								<h5 class="text-primary">Welcome Back !</h5>
								<p class="text-muted">Sign in to continue to Homepesa Club.</p>
							</div>
							<div class="p-2 mt-4">
								<!-- <form action="index"> -->
								<!-- <form method="POST" action="/dashboard-nft/"> -->
								<form>
									<div class="mb-3">
										<Label for="username" class="form-label">Username</Label>
										<input
											type="text"
											class="form-control"
											id="username"
											placeholder="Enter username"
											bind:value={lcl_username}
										/>
									</div>

									<div class="mb-3">
										<div class="float-end">
											<Link href="auth-pass-reset-basic" class="text-muted">Forgot password?</Link>
										</div>
										<Label class="form-label" for="password-input">Password</Label>
										<div class="position-relative auth-pass-inputgroup mb-3">
											<input
												type="password"
												class="form-control pe-5"
												placeholder="Enter password"
												id="password-input"
												bind:value={lcl_password}
											/>
											<button
												class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
												type="button"
												id="password-addon"><i class="ri-eye-fill align-middle" /></button
											>
										</div>
									</div>

									<div class="form-check">
										<input
											class="form-check-input"
											type="checkbox"
											value=""
											id="auth-remember-check"
										/>
										<Label class="form-check-label" for="auth-remember-check">Remember me</Label>
									</div>

									<div class="mt-4">
										<button
											on:click={() => loginClick('arg1', 'arg2')}
											class="btn btn-success w-100"
											type="button">Sign In</button
										>
									</div>

									<!--
									<div class="mt-4 text-center">
										<div class="signin-other-title">
											<h5 class="fs-13 mb-4 title">Sign In with</h5>
										</div>
										<div>
											<button
												type="button"
												class="btn btn-primary btn-icon waves-effect waves-light"
												><i class="ri-facebook-fill fs-16" /></button
											>
											<button type="button" class="btn btn-danger btn-icon waves-effect waves-light"
												><i class="ri-google-fill fs-16" /></button
											>
											<button type="button" class="btn btn-dark btn-icon waves-effect waves-light"
												><i class="ri-github-fill fs-16" /></button
											>
											<button type="button" class="btn btn-info btn-icon waves-effect waves-light"
												><i class="ri-twitter-fill fs-16" /></button
											>
										</div>
									</div>
									-->
								</form>
							</div>
						</CardBody>
						<!-- end card body -->
					</Card>
					<!-- end card -->

					<div class="mt-4 text-center">
						<p class="mb-0">
							Don't have an account ? <Link
								href="/authenticationInner/register/auth-signup-basic"
								class="fw-semibold text-primary text-decoration-underline"
							>
								Signup
							</Link>
						</p>
					</div>
				</Col>
			</Row>
			<!-- end row -->
		</Container>
		<!-- end container -->
	</div>
</ParticlesAuth>
