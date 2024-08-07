import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart';

export default defineConfig({
    base: '/elearning-particles/', // GitHub Pages path
    root: 'src/', // Source files in the src/ directory
    publicDir: '../static/', // Static assets in the static/ directory
    server: {
        host: true, // Open to local host
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if not in CodeSandbox
    },
    build: {
        outDir: '../docs', // Output to docs/ folder
        emptyOutDir: true, // Empty docs/ folder first
        sourcemap: true, // Generate sourcemap
        rollupOptions: {
            input: {
                main: 'src/index.html', // Main entry HTML file
                // other HTML files
                step1: 'src/step1.html',
                step2: 'src/step2.html',
                step3: 'src/step3.html',
                final: 'src/final.html',
            },
        },
    },
    plugins: [
        restart({
            restart: ['../static/**'], // Restart server on static file change
        }),
    ],
});