const util = require('util');
const exec = util.promisify(require('child_process').exec);


const getReceiverInfo = async (command) => {
  const out: string = (await exec(command)).stderr
  if (out.includes('not found')) {
    throw new Error(`
      ir-keytable not installed,
      sudo apt-get install ir-keytable -y
      https://github.com/gordonturner/ControlKit/blob/master/Raspbian%20Setup%20and%20Configure%20IR.md
    `);
  }

  const lirc: string = out.split('\n').find(s=> s.includes('LIRC device')).split("/")[2]
  const rc: string = "rc" + lirc.split('')[lirc.length - 1]

  const ret = { lirc, rc, }
  return ret
}

export { getReceiverInfo }