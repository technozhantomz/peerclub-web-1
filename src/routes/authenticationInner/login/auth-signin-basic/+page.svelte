<script>
	import { Container, Row, Col, Card, CardBody, Label } from 'sveltestrap';
	import Link from 'svelte-link';
	import ParticlesAuth from '../../ParticlesAuth.svelte';
	import logolight from '../../../../assets/images/logo-light.png';

	import { goto } from '$app/navigation';
	import { glb_username } from '../../../../stores.js';
	import { server_url } from '../../../../stores.js';
	import { server_sso_url, server_user_url } from '../../../../stores.js';
	import { login_user_uuid } from '../../../../stores.js';
	import { saved_name, account_id } from '../../../../stores.js';

	import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
	import { get, writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { persistent } from "@furudean/svelte-persistent-store"
	
	

	//alert("KEY VALUE: " + $myLoginInfo.string);
	//glb_username.set($saved_name);

	//console.log("SAVED USER NAME:" + $saved_name);

	let store_server_url = get(server_url);
	let store_server_sso_url = get(server_sso_url);
	let store_server_user_url = get(server_user_url);
	let lcl_username = '';
	let lcl_password = '';
	let href_signup_url = "";
	let cb_par_user_uuid = "";

	let callback_url = $page.url.searchParams.get('callback_url');

	//	let account_id = "1.2." + Math.floor(Math.random()*(999-100+1)+100);

	if(callback_url !=null){
	//cb_par_user_uuid = callback_url.split("&")[1];
	href_signup_url = "/authenticationInner/register/auth-signup-basic?callback_url=" + callback_url;

	} else {

	href_signup_url = "/authenticationInner/register/auth-signup-basic"
	}

	async function loginClickNftEvent() {
		console.log('login Success');
		//console.log("account_id:" + account_id);
		//console.log("callback_url_to_redirect=" + callback_url);

		//callback_url = callback_url + "&account_id=" + account_id;
		console.log('updated_callback_url=' + callback_url);
		goto(callback_url);
	}

	async function loginClick(arg1, arg2) {


		if (lcl_username.length < 2) {
			alert('Please enter username');
			return;
		} else if (lcl_password.length < 2) {
			alert('Please enter password');
			return;
		}
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
			
			/*
			glb_username.set(lcl_username);
			$saved_name = lcl_username;

			if (callback_url != null) {
				callback_url = callback_url.replaceAll("___","&") + '&account_id=' + lcl_username;
				goto(callback_url);
			} else {
				goto('/dashboard-nft/');
			}
			*/
			//goto('/dashboard-nft/');
			getAccountId();

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

	async function getAccountId() {
		const response = await fetch(store_server_user_url + 'getaccountid', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				account_name: lcl_username
			})
		});

		//console.log("r status: " + response.status);
		if (response.status === 200) {
			const result_json = await response.json();
			//console.log(JSON.stringify(result_json));
			//console.log('account_id:' + result_json.account_id);
			
			
			glb_username.set(lcl_username);
			$saved_name = lcl_username;
			$account_id = result_json.account_id;

			if (callback_url != null) {
				callback_url = callback_url.replaceAll("___","&") + '&account_id=' + lcl_username;
				goto(callback_url);
			} else {
				goto('/dashboard-nft/');
			}
			

		}
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
								href={href_signup_url}
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
