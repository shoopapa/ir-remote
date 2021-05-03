import { changeProtocal } from '../src/run-command/changeProtocol'

test('Update protocol', async () => {
  const x = await changeProtocal('rc1')
  return x
});