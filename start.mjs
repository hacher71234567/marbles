import esbuild from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
process.env.NODE_ENV="production"
await esbuild.build(
    {
        entryPoints: ['src/App.ts', 'src/style.css'],
        outdir: 'dist',
        entryNames: '[name]-[hash]',
        metafile: true,
        logLevel: 'debug',
        bundle: true,
        watch: true,
        sourcemap: true,
        plugins: [
            htmlPlugin(
                {
                    files: [
                        {
                            entryPoints: ['src/App.ts', 'src/style.css'],
                            filename: 'index.html',
                            htmlTemplate: 'src/index.html',
                            scriptLoading: 'module',
                            findRelatedCssFiles: true

                        }
                    ]
                }

            ),
        ],
    });