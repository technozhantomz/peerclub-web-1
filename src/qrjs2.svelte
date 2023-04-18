<script>
	import { onMount } from 'svelte';

	export let codeValue;
	export let squareSize;
	export let divId;

	let qrcode;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js';
		document.head.append(script);

		script.onload = function () {
			qrcode = new QRCode(divId, {
				text: codeValue,
				width: squareSize,
				height: squareSize,
				colorDark: '#000000',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H
			});
		};
	});
</script>

<div style="display:flex;justify-content: center;margin-top:20px" id={divId} />

<style>
	#qrcode {
		width: 20px;
		height: 200x;
		margin-top: 15px;
	}
</style>
