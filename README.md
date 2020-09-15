### 工程规范

#### 编辑规范
- editorconfig  (vscode 下载插件)
```
# 安装此插件在编辑.editorconfig时可自带提示功能 【EditorConfig for VS Code】
root = true # 表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件
[*] # 对所有文件生效
charset = utf-8 # 设置默认编码为utf-8
indent_style = space # space为soft-tabs,tab为hard-tabs
indent_size =4  # 设置整数表示规定每级缩进的列数和soft-tabs的宽度（译注：空格数）。如果设定为tab，则会使用tab_width的值（如果已指定）
end_of_line = lf # 定义换行符，支持lf、cr和crlf
insert_final_newline = true # 设为true表明使文件以一个空白行结尾，false反之
trim_trailing_whitespace = true # 设为true表示会除去换行行首的任意空白字符，false反之
[*.md]
insert_final_newline = false # 设为true表明使文件以一个空白行结尾，false反之
trim_trailing_whitespace = false # 设为true表示会除去换行行首的任意空白字符，false反之
```

####  代码规范
##### 校验工具(eslint, tslint, stylelint)
1. eslint  (js代码校验)
- 初始化
```
npm i -g eslint
eslint --init
```

- 配置文件
.eslintrc.js  | .eslintrc  | .eslintrc.json

- 运行
```
eslint "**/*.js"
```
- 忽略
.eslintignore 


2. tslint  (ts代码校验)
- 初始化
```
npm i -g tslint
tslint --init
```
- 配置文件
.tslintrc.js  | .tslintrc  | .tslintrc.json

- 运行
```
tslint "**/*.js"
```
- 忽略
.tslintignore 



3. stylelint  (css代码校验)
- 初始化
```
npm i -g stylelint
npm i -D stylelint-config-recommended  |  stylelint-config-standard  // 继承规范文件
```

- 创建 
.stylelintrc.json   .stylelintrc.js|.stylelintrc.yaml|.stylelintrc.yml| stylelint.config.js (继承自标准模式)
```配置
{
  "extends": "stylelint-config-standard"
}
```
- 运行
```
stylelint "**/*.css"
```

- 更标准 (position,display先读取,利于渲染)
(严格规定css书写顺序, position-> display -> float -> width -> background -> color -> font-size)
```
npm i -D stylelint-order stylelint-config-recess-order
```

- 额外
```
vscode  stylelint(插件)
webpack stylelint-webpack-plugin(插件)
```

#### 配合 prettier
1. 安装
```
npm install prettier --save-dev
```

2. .prettierrc
```
{
  "singleQuote": true,
  "printWidth": 120,
  "semi": false,
  "tabWidth": 2,
  "useTabs": false,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}
```

3. 避免冲突
```
npm prettier-stylelint tslint-config-prettier eslint-plugin-prettier eslint-config-prettier--save-dev

tslint.json  ->  { "extends": ["tslint-config-prettier"], "rules": {} }

.stylelintrc ->  {"extends": ["stylelint-config-standard", "prettier-stylelint"],"rules": {}}

```

#### 提交规范(git)
commit 之前进行格式校验,不通过不允许提交

##### husky 
1. 安装
```
npm install husky --save-dev
```
2. 配置
```
{
  "husky": {
    {
        "hooks": {
            "pre-commit": "npm run eslint && npm run csslint",
        }
    }
  }
}
```

##### lint-staged
1. 安装
```
npm install lint-staged --save-dev
```
2. 配置
``` package.json
  "lint-staged": {
      "src/app/**/!(demo|testing)/!(polyfills).{ts,scss}": [
        "prettier --config ./.prettierrc --write",
        "git add"
    ],
    "src/app/**/!(demo|testing)/!(polyfills).ts": [
      "tslint -c tslint.json --fix",
      "git add"
    ],
    "src/app/**/*.scss": [
      "stylelint \"src/app/**/*.scss\" --fix",
      "git add"
    ]
  },
   "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
    }
  }
``` 

##### commit message 规范
1. 安装 (需要husky, lint-staged)
```
npm install commitizen cz-conventional-changelog @commitlint/config-conventional @commitlint/cli --save-dev
```

2. 配置
``` package.json
{
  "scripts": {
    // ...
    "commit": "git-cz"
  }
  // ...
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  },
}
```
``` .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
      'type-enum': [
        2,
        'always',
        ["feat", "fix", "docs", "style", "refactor", "chore", "publish"]
      ],
      'subject-case': [0, 'never'],
  },
}
```
