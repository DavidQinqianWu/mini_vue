export default {
    input: './src/index.js',
    output: [
        {
            format: 'cjs',
            file: 'lib/guide-mini-vue.cjs.js',
        },
        {
            format: 'es',
            file: 'lib/guide-mini-vue.esm.js',
        },
    ],
    plugins: [],
};
