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
  .option('-c,--city [name]', 'Add city name')
  // [ts] Cannot find name 'process'
  .parse(process.argv)
// if (!command.city) {
//   command.outputHelp()
// }
if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red)
  process.exit()
}
