import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            '~components': new URL('./src/components/', import.meta.url)
                .pathname,
            '~utils': new URL('./src/utils/', import.meta.url).pathname,
            '~types': new URL('./src/types.ts', import.meta.url).pathname,
        },
    },
})
