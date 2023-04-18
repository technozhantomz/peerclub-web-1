<script>
	import Link from 'svelte-link';
	import {
		Card,
		CardBody,
		Col,
		Container,
		Row,
		Label,
		Modal,
		ModalHeader,
		ModalBody
	} from 'sveltestrap';
	import ParticlesAuth from '../../ParticlesAuth.svelte';
	import { glb_username } from '../../../../stores.js';
	import { server_url } from '../../../../stores.js';
	import { server_user_url } from '../../../../stores.js';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	//import images
	import logoLight from '../../../../assets/images/logo-ppy.png';
	import { saved_name,account_id } from '../../../../stores.js';

	/*
	{  
      "username" : "testuser26" ,  
      "userscopes" : "datasecuritynode" ,  
      "userpass" : "testuser26.." ,  
      "userfullname" : "Testuser 26" ,   
      "useremail" : "testuser26@try.com"  
    }
	*/
	let store_server_url = get(server_url);
	let store_server_user_url = get(server_user_url);
	let reg_username = '';
	let reg_userpass = '';
	let reg_userfullname = '';
	let reg_useremail = '';
	let reg_scopes = 'scenes';

	let isModalKey = false;
	let brain_key = '';
	let private_key = '';
	let public_key = '';

	let callback_url = $page.url.searchParams.get('callback_url');

	async function registerClick(arg1, arg2) {
		if (reg_useremail.length < 2) {
			alert('Please fill all form values');
			return;
		} else if (reg_username.length < 2) {
			alert('Please fill all form values');
			return;
		} else if (reg_userfullname.length < 2) {
			alert('Please fill all form values');
			return;
		} else if (reg_userpass.length < 1) {
			alert('Please enter password');
			return;
		}

		const response = await fetch(store_server_user_url + 'adduser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: reg_username,
				userpass: reg_userpass,
				userscopes: 'scenes',
				userfullname: reg_userfullname,
				useremail: reg_useremail
			})
		});

		const result_json = await response.json();

		console.log('r status: ' + response.status);
		if (response.status === 200) {
			// ??? const result_json = await response.json();
			public_key = result_json.peerplays_pub_key;
			brain_key = result_json.peerplays_brain_priv_key; 
			private_key = result_json.peerplays_wif_priv_key;

			console.log('callbackk: ' + callback_url);
			glb_username.set(reg_username);
			$saved_name = reg_username;

			getAccountId(result_json.peerplays_username);
			//isModalKey = true;


		} else {
			// TODO WRONG USER!!
			glb_username.set('');
			alert('Please check username and password!');
			throw new Error(response.statusText);
		}

		console.log('reg_username' + reg_username);
	}

	function completeRegister() {
		if (callback_url != null) {
			if (callback_url.includes('nft-ops')) {
				callback_url = callback_url + '&account_id=' + reg_username;
				goto(callback_url.replaceAll('___', '&'));
			} else {
				goto(callback_url);
				alert('Registration success. You are redirecting to login page.');
			}
		} else {
			goto('/dashboard-nft/');
		}
	}

	async function getAccountId(registered_username) {
		const response = await fetch(store_server_user_url + 'getaccountid', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				account_name: registered_username
			})
		});

		//console.log("r status: " + response.status);
		if (response.status === 200) {
			const result_json = await response.json();
			$account_id = result_json.account_id;
			isModalKey = true;

		}
	}
</script>

<svelte:head>
	<title>Sign Up | Homepesa Mega Platform</title>
</svelte:head>
<ParticlesAuth>
	<div class="auth-page-content">
		<Container>
			<Row>
				<Col lg={12}>
					<div class="text-center mt-sm-5 mb-4 text-white-50">
						<div>
							<Link href="" class="d-inline-block auth-logo">
								<img src={logoLight} alt="" height="" />
							</Link>

							<!--<p class="mt-3 fs-15 fw-medium">peer-2-peerid</p>-->
						</div>
						<p class="mt-3 fs-15 fw-medium">Welcome to peer-2-peerid</p>
					</div>
				</Col>
			</Row>

			<Row class="justify-content-center">
				<Col md={8} lg={6} xl={5}>
					<Card class="mt-4">
						<CardBody class="p-4">
							<div class="text-center mt-2">
								<h5 class="text-primary">Create New Account</h5>
								<p class="text-muted">Get your free peer-2-peerid account now</p>
							</div>
							<div class="p-2 mt-4">
								<form class="needs-validation" action="">
									<div class="mb-3">
										<Label for="useremail" class="form-label"
											>Email <span class="text-danger">*</span></Label
										>
										<input
											type="email"
											class="form-control"
											id="useremail"
											placeholder="Enter email address"
											bind:value={reg_useremail}
											required
										/>
										<div class="invalid-feedback">Please enter email</div>
									</div>
									<div class="mb-3">
										<Label for="username" class="form-label"
											>Username <span class="text-danger">*</span></Label
										>
										<input
											type="text"
											class="form-control"
											id="username"
											placeholder="Enter username"
											bind:value={reg_username}
											required
										/>
										<div class="invalid-feedback">Please enter username</div>
									</div>

									<div class="mb-3">
										<Label for="fullname" class="form-label"
											>Name <span class="text-danger">*</span></Label
										>
										<input
											type="text"
											class="form-control"
											id="fullname"
											placeholder="Enter Full Name"
											bind:value={reg_userfullname}
											required
										/>
										<div class="invalid-feedback">Please enter username</div>
									</div>

									<div class="mb-2">
										<Label for="userpassword" class="form-label"
											>Password <span class="text-danger">*</span></Label
										>
										<input
											type="password"
											class="form-control"
											id="userpassword"
											placeholder="Enter password"
											bind:value={reg_userpass}
											required
										/>
										<div class="invalid-feedback">Please enter password</div>
									</div>

									<div class="mb-4">
										<p class="mb-0 fs-12 text-muted fst-italic">
											By registering you agree to the Peer-2-peerID
											<Link
												href=""
												class="text-primary text-decoration-underline fst-normal fw-medium"
												>Terms of Use</Link
											>
										</p>
									</div>

									<div class="mt-4">
										<button
											on:click={() => registerClick('arg1', 'arg2')}
											class="btn btn-success w-100"
											type="button">Sign Up</button
										>
									</div>

									<div class="mt-4 text-center">
										<div class="signin-other-title">
											<h5 class="fs-13 mb-4 title text-muted">Create account with</h5>
										</div>

										<div>
											<button
												type="button"
												class="btn btn-primary btn-icon waves-effect waves-light"
												><i class="ri-facebook-fill fs-16" /></button
											>{' '}
											<button type="button" class="btn btn-danger btn-icon waves-effect waves-light"
												><i class="ri-google-fill fs-16" /></button
											>{' '}
											<button type="button" class="btn btn-dark btn-icon waves-effect waves-light"
												><i class="ri-github-fill fs-16" /></button
											>{' '}
											<button type="button" class="btn btn-info btn-icon waves-effect waves-light"
												><i class="ri-twitter-fill fs-16" /></button
											>
										</div>
									</div>
								</form>
							</div>
						</CardBody>
					</Card>

					<div class="mt-4 text-center">
						<p class="mb-0">
							Already have an account ? <Link
								href="/authenticationInner/login/auth-signin-basic"
								class="fw-semibold text-primary text-decoration-underline"
							>
								Signin
							</Link>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
</ParticlesAuth>

<!--Modal For Keys-->
<Modal contentClassName="p-2" isOpen={isModalKey}>
	<ModalHeader tag="h4">User KEYS</ModalHeader>
	<ModalBody>
		<Row>
			<Col class="col-12">
				<div class="mb-3">
					<Label class="form-label" for="title">BRAIN KEY</Label>

					<input
						type="text"
						class="form-control"
						name="prv_key"
						placeholder="Please Enter Private Key"
						bind:value={brain_key}
					/>
				</div>
				<div class="mb-3">
					<Label class="form-label" for="title">PRIVATE KEY</Label>

					<input
						type="text"
						class="form-control"
						name="prv_key"
						placeholder="Please Enter Private Key"
						bind:value={private_key}
					/>
				</div>
				<div class="mb-3">
					<Label class="form-label" for="title">PUBLIC KEY</Label>

					<input
						type="text"
						class="form-control"
						name="prv_key"
						placeholder="Please Enter Private Key"
						bind:value={public_key}
					/>
				</div>
			</Col>
		</Row>
		<Row class="mt-2">
			<Col xs="12" class="text-end">

				<button
					type="submit"
					class="btn btn-success save-event"
					on:click={completeRegister}
				>
				 Continue
				</button>
			</Col>
		</Row>
	</ModalBody>
</Modal>
