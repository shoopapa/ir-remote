import { getReceiverInfo } from '../src/get-receiver-info/getReceiverInfo'




test('not running a found command should throw getReceiverInfo ', async () => {
  await expect(() => getReceiverInfo('not installed') ).rejects.toThrow();
});