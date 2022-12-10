import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return Array.prototype.concat(...files);
}

const files = getFiles(resolve(__dirname, 'public'))
    .filter((x) => x.endsWith('index.html'))
    .map((x) => {
        const key = (x ?? '')
            .split(resolve(__dirname, 'public'))[1]
            .split('/')
            .join('-')
            .replace('-', '')
            .split('.')
            .join('-');
        return { [key]: x };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

console.log(files);

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
                    ...files
                }
            }
        }
    };
});
