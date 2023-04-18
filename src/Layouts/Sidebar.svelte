<script>
	//Import Components
	import { onMount } from 'svelte';
	import { Container } from 'sveltestrap';
	import VerticalLayout from './VerticalLayout.svelte';
	import HorizontalLayout from './HorizontalLayout.svelte';
	import TwoColumnLayout from './TwoColumnLayout.svelte';
	import { browser } from '$app/environment';
	import { Form, Input, Dropdown, DropdownMenu, Button } from 'sveltestrap';

	onMount(async () => {
		if (browser) {
			var verticalOverlay = document.getElementsByClassName('vertical-overlay');
			if (verticalOverlay) {
				verticalOverlay[0].addEventListener('click', function () {
					document.body.classList.remove('vertical-sidebar-enable');
				});
			}
		}
	});

	const verticalSidebarClass = () => {
		if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover') {
			document.documentElement.setAttribute('data-sidebar-size', 'sm-hover-active');
		} else if (document.documentElement.getAttribute('data-sidebar-size') === 'sm-hover-active') {
			document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
		} else {
			document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
		}
	};
	export let layoutType;

	import logosm from '../assets/images/logo-sm.png';
	import logodark from '../assets/images/logo-dark.png';
	import logolight from '../assets/images/logo-light.png';

	function toogleMenuBtn() {
		console.log('a');
		if (browser) {
			var windowSize = document.documentElement.clientWidth;

			if (windowSize > 767) document.querySelector('.hamburger-icon').classList.toggle('open');

			//For collapse horizontal menu
			if (document.documentElement.getAttribute('data-layout') === 'horizontal') {
				document.body.classList.contains('menu')
					? document.body.classList.remove('menu')
					: document.body.classList.add('menu');
			}

			//For collapse vertical menu
			if (document.documentElement.getAttribute('data-layout') === 'vertical') {
				if (windowSize < 1025 && windowSize > 767) {
					document.body.classList.remove('vertical-sidebar-enable');
					document.documentElement.getAttribute('data-sidebar-size') === 'sm'
						? document.documentElement.setAttribute('data-sidebar-size', '')
						: document.documentElement.setAttribute('data-sidebar-size', 'sm');
				} else if (windowSize > 1025) {
					document.body.classList.remove('vertical-sidebar-enable');
					document.documentElement.getAttribute('data-sidebar-size') === 'lg'
						? document.documentElement.setAttribute('data-sidebar-size', 'sm')
						: document.documentElement.setAttribute('data-sidebar-size', 'lg');
				} else if (windowSize <= 767) {
					document.body.classList.remove('vertical-sidebar-enable');
					document.documentElement.setAttribute('data-sidebar-size', 'lg');
				}
			}

			//Two column menu
			if (document.documentElement.getAttribute('data-layout') === 'twocolumn') {
				document.body.classList.contains('twocolumn-panel')
					? document.body.classList.remove('twocolumn-panel')
					: document.body.classList.add('twocolumn-panel');
			}
		}
	}
</script>

<svelte:head>
	<script src="//unpkg.com/simplebar@latest/dist/simplebar.min.js"></script>
	<script src="//cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js"></script>
</svelte:head>
<div class="app-menu navbar-menu">
	<!-- LOGO -->
	<div class="navbar-brand-box">
		<!-- Dark Logo-->
		<a href="/dashboard-nft" class="logo logo-dark">
			<span class="logo-sm">
				<img src={logosm} alt="" height="22" />
			</span>
			<span class="logo-lg">
				<img src={logodark} alt="" height="17" />
			</span>
		</a>
		<!-- Light Logo-->
		<a href="/dashboard-nft" class="logo logo-light">
			<span class="logo-sm" style="-display:flex !important">
				<img src={logosm} alt="" height="22" />
			</span>

			<span class="logo-lg">
				<img src={logolight} alt="" height="17" />
			</span>
		</a>
		<button
			type="button"
			class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
			id="vertical-hover"
			on:click={verticalSidebarClass}
		>
			<i class="ri-record-circle-line" />
		</button>
	</div>

	{#if layoutType === 'horizontal'}
		<div id="scrollbar">
			<div class="container-fluid">
				<div id="two-column-menu" />
				<ul class="navbar-nav" id="navbar-nav">
					<HorizontalLayout />
				</ul>
			</div>
			<!-- Sidebar -->
		</div>
	{:else if layoutType === 'twocolumn'}
		<TwoColumnLayout {layoutType} />
	{:else}
		<div id="scrollbar" data-simplebar class="h-100">
			<Container fluid>
				<div id="two-column-menu" />
				<ul class="navbar-nav" id="navbar-nav">
					<label />
					<button
						type="button"
						class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
						id="topnav-hamburger-icon"
						on:click={toogleMenuBtn}
					>
						<span class="hamburger-icon">
							<span />
							<span />
							<span />
						</span>
					</button>
					<VerticalLayout />
				</ul>
			</Container>
		</div>
	{/if}

	<div class="sidebar-background" />
</div>

<div class="vertical-overlay" />
