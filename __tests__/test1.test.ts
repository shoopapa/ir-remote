import { getRc } from '../src/getRc'

test('getRc with it ir-keytable installed', async () => {
  const x = await getRc()
  console.log(x)
});