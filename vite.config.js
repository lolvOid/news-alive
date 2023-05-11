import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv ,loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

const env = loadEnv("development",process.env)
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vuetify({ autoImport: true })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: true,
        port: 8000,
    },
});
