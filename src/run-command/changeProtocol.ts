const util = require('util');
const exec = util.promisify(require('child_process').exec);


const getReceiverInfo = async (rc) => {
  const command = `sudo ir-keytable -p all -s ${rc}`
  const out: string = (await exec(command)).stderr
  if (!rc.includes('Protocols changed')) {
    throw new Error(`
      ir-keytable not installed,
      sudo apt-get install ir-keytable -y
      https://github.com/gordonturner/ControlKit/blob/master/Raspbian%20Setup%20and%20Configure%20IR.md
    `);
  }


  return out
}

export { getReceiverInfo }
