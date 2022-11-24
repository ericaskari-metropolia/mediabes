import path, { resolve } from 'path';
import fs from 'fs';

/** @type {import('vite').UserConfig} */

const publicDir = path.resolve(__dirname, 'public');

const publicFileAndFolders = fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter((x) => x.name !== 'assets')
    .filter((x) => x.isDirectory())
    .map((x) => [x.name, path.resolve(publicDir, x.name)])
    .reduce(
        (prev, [key, dirPath]) => ({ ...prev, [key]: `${dirPath}/index.html` }),
        {}
    );

export default {
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
