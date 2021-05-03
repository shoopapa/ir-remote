import { getReceiverInfo } from '../src/get-receiver-info/getReceiverInfo'

test('getRc with it ir-keytable installed', async () => {
  const x = await getReceiverInfo('ir-keytable')
  console.log(x)
});