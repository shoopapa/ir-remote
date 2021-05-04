import { checkCommandInstall } from '../src/command-check/checkCommandInstall'


test('checkCommandInstall not installed', async () => {
  await expect(() => checkCommandInstall('not installed') ).rejects.toThrow();

});