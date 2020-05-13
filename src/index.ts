import axios, { AxiosResponse } from 'axios'
import colors from 'colors'
import commander from 'commander'
// commander
//   .version('0.1.0')
//   .option('-p,--peppers', 'Add peppers')
//   .option('-p,--pineapple', 'Add pineapple')
//   .option('-b,--bbq-asuce', 'Add bbq asuce')
//   .option(
//     '-c,--cheese [type]',
//     'Add the specified type of cheese [marble]',
//     'marble'
//   )
//   // [ts] Cannot find name 'process'
//   .parse(process.argv)
const command = commander
  .version('0.1.0')
  .option('-c, --city [name]', 'Add city name')
  // [ts] Cannot find name 'process'
  .parse(process.argv)
// if (!command.city) {
//   command.outputHelp()
// }
if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red)
  process.exit()
}

interface IWeatherResponse {
  status: string
  count: string
  info: string
  infocode: string
  lives: Ilive[]
}

interface Ilive {
  province: string
  city: string
  adcode: string
  weather: string
  temperature: string
  winddirection: string
  windpower: string
  humidity: string
  reporttime: string
}
const URL = 'https://restapi.amap.com/v3/weather/weatherInfo'
const KEY = 'b1d58d228c80251d7fecf10586bf3829'

// axios
//   .get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
//   .then((res: AxiosResponse) => {
//     // 无法识别data
//     // (property) AxiosResponse<any>.data: any
//     console.log(res.data)
//   })

// 下面的方法可以识别data
// tslint:disable-next-line:no-console
const log = console.log
// axios
//   .get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
//   .then((res: AxiosResponse<IWeatherResponse>) => {
//     // (property) AxiosResponse<IWeatherResponse>.data: IWeatherResponse
//     // log(res.data)
//     const live = res.data.lives[0]
//     log(colors.yellow(live.reporttime))
//     log(colors.white(`${live.provice} ${live.city}`))
//     log(colors.green(`${live.weather} ${live.temperature} 度`))
//   })
//   .catch(() => {
//     log(colors.red('天气服务出现异常'))
//   })
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
