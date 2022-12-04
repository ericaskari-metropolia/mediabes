import path, { resolve } from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';

const publicDir = path.resolve(__dirname, 'public');
const publicFileAndFolders = fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter((x) => x.name !== 'assets' && x.name !== 'shared' && x.name !== 'components')
    .filter((x) => x.isDirectory())
    .map((x) => [x.name, path.resolve(publicDir, x.name)])
    .reduce((prev, [key, dirPath]) => ({ ...prev, [key]: `${dirPath}/index.html` }), {});

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
    return {
        root: resolve(__dirname, 'public'),
        publicDir: resolve(__dirname, 'public/assets'),
        appType: 'mpa',
        server: {
            port: 3001
        },
        build: {
            outDir: resolve(__dirname, 'dist'),
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'public/index.html'),
                    ...publicFileAndFolders
                }
            }
        }
    };
});
