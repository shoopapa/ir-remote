import { checkCommandInstall } from '../src/command-check/checkCommandInstall'

test('checkCommandInstall success', async () => {
  const x = await checkCommandInstall('ir-keytable')
  console.log(x)
  return x
});