import esbuild from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';

await esbuild.build(
    {
        entryPoints: ['src/App.ts', 'src/style.css'],
        outdir: 'dist',
        entryNames: '[name]-[hash]',
        metafile: true,
        logLevel: 'debug',
        bundle: true,
        minify: true,
        sourcemap: false,
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