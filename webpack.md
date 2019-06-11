# WebPack
서버에서 처리하는 로직을 JavaScript로 구현하는 부분이 많아지면서 웹 서비스 개발에서 JavaScript로 작성하는 코드의 양도 늘어났습니다.  
코드의 양이 많아지면 코드의 유지와 보수가 쉽ㄷ도록 코드를 모듈로 나누어 관리하는 모듈 시스템이 필요해집니다. 그러나 
JavaScript는 언어 자체가 지원하는 모듈 시스템이 없습니다. 이런 한계를 극복하려 여러가지 도구를 활용하는데 그 도구 가운데 하나가 웹팩(Webpack)입니다.  
웹팩은 프로젝트의 구조를 분석하고 자바스크립트 모듈을 비롯한 관련 리소스들을 찾은 다음 이를 브라우저에서 이용할 수 있는 번들로 묶고 패킹하는 모듈 번들러(Module bundler)입니다.

## 설치
```js
npm i -g webpack webpack-cli && npm i -D webpack webpack-cli
```

## npm 스크립트 사용
package.json내에 작성하여 간단하게 실행하십시오.
```js
"scripts": {
  "build": "webpack"
}
```
##
콘솔에 다음과 같이 실행하십시오.
```
npm run build
```
## 옵션

### Mode
```js
module.exports = {
  mode: 'production'
};
```
```
webpack --mode=production
```
Option|Description
-|-
development|압축되지 않은 번들파일로 설정
production|압축된 번들파일 설정
non|기본값인 production로 설정

### Entry
웹팩이 파일을 읽어들이기 시작하는 부분의 경로를 지정합니다.
```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

### Output
번들된 결과물을 처리할 경로를 지정합니다.
```js
module.exports = {
  //...
  output: {
    path: _dirname + '/dist' //번들파일 출력경로지정
    library: 'someLibName', //해당 번들을 라이브러리로 내보냄
    libraryTarget: 'umd', //라이브러리를 내보낼 형식지정 ex. var,this,commonjs,umd...
    filename: 'someLibName.js', //번들파일 이름지정
  }
};
```

### Module
#### loader
자바스크립트가 아닌 파일들을 관리, 변경해줍니다.
```js
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};
```
-|-
-|-
test|로딩할 파일을 지정
use|적용할 로더 설정


### Plugins
로더가 파일단위로 처리하는 반면 플러그인은 번들된 결과물을 처리합니다.  
부가적인 기능을 추가할때 사용합니다.
```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```