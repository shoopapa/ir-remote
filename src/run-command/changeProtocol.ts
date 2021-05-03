const util = require('util');
const exec = util.promisify(require('child_process').exec);


const changeProtocol = async (rc) => {
  const command = `sudo ir-keytable -p all -s ${rc}`
  const out: string = (await exec(command)).stderr
  if (!rc.includes('Protocols changed')) {
    throw new Error(`
      Error running "${command}" Check this for information to set this 
      https://github.com/gordonturner/ControlKit/blob/master/Raspbian%20Setup%20and%20Configure%20IR.md
    `);
  }
  
  console.log(out)
  return out
}

export { changeProtocol }
