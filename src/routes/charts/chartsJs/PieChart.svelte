<script>
	import Pie from 'svelte-chartjs/src/Pie.svelte';
	export let dataColors;
	import { browser } from '$app/environment';

	function getChartColorsArray(colors) {
		if (browser) {
			return colors.map(function (value) {
				var newValue = value.replace(' ', '');
				if (newValue.indexOf(',') === -1) {
					var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
					if (color.indexOf('#') !== -1) color = color.replace(' ', '');
					if (color) return color;
					else return newValue;
				} else {
					var val = value.split(',');
					if (val.length === 2) {
						var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
						rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')';
						return rgbaColor;
					} else {
						return newValue;
					}
				}
			});
		}
	}

	var pieChartColors = getChartColorsArray(dataColors);

	const data = {
		labels: ['Desktops', 'Tablets'],
		datasets: [
			{
				data: [300, 180],
				backgroundColor: pieChartColors,
				hoverBackgroundColor: pieChartColors,
				hoverBorderColor: '#fff'
			}
		]
	};
</script>

<Pie class="chartjs-chart" {data} option={{ responsive: true, maintainAspectRatio: false }} />
