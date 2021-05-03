const util = require('util');
const exec = util.promisify(require('child_process').exec);


const getRc = async () => {
  const rc: string = (await exec('ir-keytble')).stderr
  return rc 
}

export { getRc }