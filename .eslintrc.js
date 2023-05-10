/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    overrides: [],
    extends: ['airbnb-base', 'plugin:vue/vue3-recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['vue', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
    setting:{
        'import/resolver': {
            'alias': {
                map:[
                    ['@','./src'],
                    ['~', './'],
                    ['^vue$', 'vue/dist/vue.esm-bundler.js'],
                    ['^vuetify/', 'vuetify/es5/components/'],
                ],
                extensions: ['.js', '.ts', '.vue']
            },
            node: {
                extensions: ['.js', '.ts', '.vue']
            }
        },
        'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx', '.vue'],
        'import/core-modules': [
          'vue',
          'vue-router',
          'vuex',
          'axios',
      
        ]
    },
}
