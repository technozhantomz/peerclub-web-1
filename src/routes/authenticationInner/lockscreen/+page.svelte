<script>
	import { Button, Card, CardBody, Col, Container, Row, Label } from 'sveltestrap';
	import ParticlesAuth from '../ParticlesAuth.svelte';
	import Link from 'svelte-link';
	import logoLight from '../../../assets/images/logo-light.png';
	import avatar1 from '../../../assets/images/users/avatar-1.jpg';

	import { glb_username,saved_name } from '../../../stores.js';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import Avatar from 'svelte-avatar';

	let store_glb_username ="";
	saved_name.subscribe((value) => 
	store_glb_username=value);

	function unlockUser() {
		goto('/dashboard-nft/');
	}
</script>

<svelte:head>
	<title>Lock Screen | Homepesa Mega platform</title>
</svelte:head>
<div class="auth-page-content">
	<div class="auth-page-wrapper">
		<ParticlesAuth>
			<div class="auth-page-content">
				<Container>
					<Row>
						<Col lg={12}>
							<div class="text-center mt-sm-5 mb-4 text-white-50">
								<div>
									<Link href="/dashboard-nft" class="d-inline-block auth-logo">
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
								<CardBody class="p-4">
									<div class="text-center mt-2">
										<h5 class="text-primary">Lock Screen</h5>
										<p class="text-muted">Enter your password to unlock the screen!</p>
									</div>
									<div class="user-thumb text-center">
										
										<!--<img
											src={avatar1}
											class="rounded-circle img-thumbnail avatar-lg"
											alt="thumbnail"
										/>
										-->
										<div class="d-flex justify-content-center">
										<Avatar bgColor="#7084c7" name={store_glb_username} />
										</div>
										<h5 class="font-size-15 mt-3">{store_glb_username}</h5>
									</div>
									<div class="p-2 mt-4">
										<form>
											<div class="mb-3">
												<Label class="form-label" for="userpassword">Password</Label>
												<input
													type="password"
													class="form-control"
													id="userpassword"
													placeholder="Enter password"
													required
												/>
											</div>
											<div class="mb-2 mt-4">
												<Button on:click={unlockUser} color="success" class="w-100" type="submit"
													>Unlock</Button
												>
											</div>
										</form>
									</div>
								</CardBody>
							</Card>
							<div class="mt-4 text-center">
								<p class="mb-0">
									Not you ? return <Link
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
	</div>
</div>
