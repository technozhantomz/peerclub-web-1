<script>
	import { onMount } from 'svelte';
	import user from '../../../../assets/images/small/img-4.jpg';

	var options = {
		chart: {
			type: 'bar',
			height: 410,
			animations: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		series: [
			{
				name: 'coins',
				data: [
					2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12, 11, 12, 13, 14, 16,
					14, 15, 17, 19, 21
				]
			}
		],
		plotOptions: {
			bar: {
				horizontal: true,
				barHeight: '100%'
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			colors: ['#fff'],
			width: 0.2
		},
		labels: Array.apply(null, {
			length: 39
		}).map(function (el, index) {
			return index + 1;
		}),
		yaxis: {
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false
			},
			title: {
				text: 'Weight'
			}
		},
		grid: {
			position: 'back'
		},
		title: {
			text: 'Paths filled by clipped image',
			align: 'right',
			offsetY: 30,
			style: {
				fontWeight: 500
			}
		},
		fill: {
			type: 'image',
			opacity: 0.87,
			image: {
				src: [user],
				width: 466,
				height: 406
			}
		}
	};
	onMount(() => {
		const chart = new ApexCharts(document.querySelector('#barwithimages'), options);
		chart.render();
	});
</script>

<div id="barwithimages" class="apex-charts" dir="ltr" />
