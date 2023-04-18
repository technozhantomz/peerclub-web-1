import { sveltekit } from '@sveltejs/kit/vite';
//import { defineConfig } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit({
		preprocess: sveltePreprocess()
	})],

	build: {
		polyfillDynamicImport: false,
		cssCodeSplit: false,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		dedupe: ['@fullcalendar/common', "svelte", 'svelte-apexcharts'],
		
	},
     optimizeDeps: {
       include: ['@fullcalendar/common','dayjs']
    },

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},


	ssr: {
		noExternal: ['@popperjs/core']
	}



};

export default config;
