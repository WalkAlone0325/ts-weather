## 初始化项目

- `mkdir ts-weather`
- `code ts-weather`
- 新建 `index.ts`
  - 输入`console.log('Hello ts-weather')`
- `yarn add --dev ts-node typescript`

## 配置 TSConfig

- `yarn tsc -init`

## 配置 TSLint

- `yarn add tslint --dev`
- `yarn tslint --init`

## 使用 git

[http://rogerdudler.github.io/git-guide/index.zh.html](http://rogerdudler.github.io/git-guide/index.zh.html)

- 添加 `.gitigore`文件：

  ```.gitigore
  .DS_Store
  node_modules
  /dist

  # local env files
  .env.local
  .env.*.local

  # Log files
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*

  # Editor directories and files
  .idea
  .vscode
  *.suo
  *.ntvs*
  *.njsproj
  *.sln
  *.sw?
  ```

  - `git init`
  - `git add -A`
  - `git commit -m 'init project'`

- `yarn add husky --dev`
  - `package.json`文件：
    ```json
      "husky": {
        "hooks": {
          "pre-commit": "yarn tslint -c tslint.json './**/*.ts"
        }
      }
    ```

## Commander.js

> Commander.js 是一套完整的命令行交互解决方案。接下来我们将使用它来编写 TypeScript 命令。

### 格式化命令

- `yarn add commander`

  ```js
  import commander from 'commander'
  commander
    .version('0.1.0')
    .option('-p,--peppers', 'Add peppers')
    .option('-p,--pineapple', 'Add pineapple')
    .option('-b,--bbq-asuce', 'Add bbq asuce')
    .option(
      '-c,--cheese [type]',
      'Add the specified type of cheese [marble]',
      'marble'
    )
    // [ts] Cannot find name 'process'
    .parse(process.argv)
  ```

- `yarn add @types/node`
  ```ts
    // [ts] Cannot find name 'process'
  .parse(process.argv)
  ```
  [https://github.com/tj/commander.js/blob/master/Readme.md](https://github.com/tj/commander.js/blob/master/Readme.md)

### 更好的输入

```js
if (process.argv.slice(2).length === 0) {
  command.outputHelp()
  process.exit()
}
```

### 添加色彩

`yarn add colors`

## 处理网络请求

使用 Promise 和 async 两种方式实现

### 定义接口

[https://lbs.amap.com/api/webservice/guide/api/weatherinfo/](https://lbs.amap.com/api/webservice/guide/api/weatherinfo/)

```ts
interface IWeatherResponse {
  status: string
  count: string
  info: string
  infocode: string
  lives: Ilive[]
}

interface Ilive {
  provice: string
  city: string
  adcode: string
  weather: string
  temperature: string
  winddirection: string
  windpower: string
  humidity: string
  reporttime: string
}
```

### Promise

`yarn add axios`

```ts
async function getWeather(city: string) {
  try {
    const url = `${URL}?city=${encodeURI(command.city)}&key=${KEY}`
    const reponse = await axios.get(url)
    const live = reponse.data.lives[0]
    log(colors.yellow(live.reporttime))
    log(colors.white(`${live.province} ${live.city}`))
    log(colors.green(`${live.weather} ${live.temperature} 度`))
  } catch {
    log(colors.red('天气服务出现异常'))
  }
}
getWeather(command.city)
```

## 输出

2020-05-13 15:58:45
山西 朔州市
多云 25 度
Done in 2.49s.
