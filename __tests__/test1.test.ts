import { checkCommandInstall } from '../src/command-check/checkCommandInstall'

test('getRc with it ir-keytable installed', async () => {
  const x = await checkCommandInstall('ir-keytable')
  console.log(x)
});