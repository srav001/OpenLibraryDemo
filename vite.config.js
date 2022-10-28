import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line import/no-unresolved
import Unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), Unocss({})],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
});
