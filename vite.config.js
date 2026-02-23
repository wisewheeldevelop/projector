import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                accessibility: resolve(__dirname, 'accessibility.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                terms: resolve(__dirname, 'terms.html'),
            },
        },
    },
    plugins: [
        {
            name: 'copy-images',
            closeBundle() {
                const srcDir = resolve(__dirname, 'Images');
                const destDir = resolve(__dirname, 'dist', 'Images');
                if (fs.existsSync(srcDir)) {
                    // Creates the dist directory if needed, then copies Images/ inside
                    fs.cpSync(srcDir, destDir, { recursive: true });
                    console.log('✅ Copied Images directory to dist/Images for Vercel deployment!');
                }
            }
        }
    ]
});
