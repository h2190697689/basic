module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": 'babel-eslint',
    "extends": [
        "plugin:react/recommended",
        "standard",
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "no-console": 2
    }
};
