<script>
	import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'sveltestrap';
	import avatar1 from '../../assets/images/users/avatar-1.jpg';
	import Avatar from 'svelte-avatar';
	import { onMount } from 'svelte';

	import { get } from 'svelte/store';
	import { glb_username } from '../../stores.js';

	let store_glb_username = '';

	import { saved_name,server_nft_url } from '../../stores.js';

let store_nft_url = get(server_nft_url);
let user_balance;
	saved_name.subscribe((value) => (store_glb_username = value));


onMount(() => {
	getAccountBalance();

});

	async function getAccountBalance() {
		const res = await fetch(store_nft_url + 'getaccountbalance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				account_name: store_glb_username
				
			})
		});

		const result_json = await res.json();
		let json_base_uri;
		console.log(result_json.balance);
		user_balance = result_json.balance;
		user_balance = user_balance.substring(0,5);
	}



</script>

<Dropdown class="ms-sm-3 header-item topbar-user">
	<DropdownToggle type="button" color="" class="btn" id="page-header-user-dropdown p-0">
		<span class="d-flex align-items-center">
			<!--
			<img class="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
			-->
			<Avatar size="36px" bgColor="#7084c7" name={store_glb_username} />
			<span class="text-start ms-xl-2">
				<span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
					>{store_glb_username}</span
				>
				<span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>
			</span>
		</span>
	</DropdownToggle>
	<DropdownMenu class="dropdown-menu-end" end>
		<!-- item-->
		<!--<h6 class="dropdown-header">Welcome Anna!</h6>-->
		<DropdownItem href="/pages/profile/simple/simplepage"
			><i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
			<span class="align-middle">Profile</span></DropdownItem
		>
		<DropdownItem href="/apps-chat"
			><i class="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />
			<span class="align-middle">Messages</span></DropdownItem
		>
		<DropdownItem href=""
			><i class="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />
			<span class="align-middle">Taskboard</span></DropdownItem
		>
		<DropdownItem href=""
			><i class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />
			<span class="align-middle">Help</span></DropdownItem
		>
		<div class="dropdown-divider" />
		<DropdownItem href=""
			><i class="mdi mdi-wallet text-muted fs-16 align-middle me-1" />
			<span class="align-middle">Balance : <b>{user_balance} TEST</b></span></DropdownItem
		>
		<DropdownItem href=""
			><span class="badge bg-soft-success text-success mt-1 float-end">New</span><i
				class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"
			/> <span class="align-middle">Settings</span></DropdownItem
		>
		<DropdownItem href="/authenticationInner/lockscreen"
			><i class="mdi mdi-lock text-muted fs-16 align-middle me-1" />
			<span class="align-middle">Lock screen</span></DropdownItem
		>
		<DropdownItem href="/authenticationInner/logout"
			><i class="mdi mdi-logout text-muted fs-16 align-middle me-1" />
			<span class="align-middle" data-key="t-logout">Logout</span></DropdownItem
		>
	</DropdownMenu>
</Dropdown>
