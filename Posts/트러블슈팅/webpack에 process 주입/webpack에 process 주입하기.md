# webpack에 process 주입하기

- `webpack`을 통해 코드를 번들링하면 불필요한 것들을 코드에 포함하지 않는다.
- 이 중에는 `process`도 포함되는데 환경 변수에 접근해야 할 때 이 부분이 문제가 될 수 있다.

<br/>

## development 모드의 해결 방법

- `dotenv`를 사용한다는 가정하에 진행된다.

```javascript
const dotenv = require("dotenv");

dotenv.config();

plugins: [
  new webpack.DefinePlugin({
    "process.env": JSON.stringify(process.env),
  }),
];
```

- 환경 변수를 코드에 직접 주입할 수 있다.

<br/>

## production 모드의 해결 방법

- `API` 키의 보안을 위해 위의 방법은 사용할 수 없다.

```javascript
plugins: [
  new webpack.ProvidePlugin({
    process: "process/browser",
  }),
];
```

- 위의 코드만 사용할 경우 `Did you mean 'browser.js'?`을 포함하는 에러 메시지를 확인할 수 있다.

```javascript
resolve: {
    fallback: {
        //...
        "process/browser": require.resolve("process/browser"),
    },
},
```

- 위의 코드를 `webpack.config`에 추가시켜 주면 해결된다.
