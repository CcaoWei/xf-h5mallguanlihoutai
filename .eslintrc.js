module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaVersion: 8,
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/essential'],

    rules: {
        'no-console': 0,
        'no-unused-vars': 0,
        'no-control-regex': 0,
        'no-useless-escape': 1,
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-empty-pattern': 1,
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'vue/no-unused-vars': 1,
        'vue/valid-v-model': 1,
        "no-irregular-whitespace":"off"//这禁止掉 空格报错检查
    },
};
