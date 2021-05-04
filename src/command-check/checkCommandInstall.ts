import util from 'util'
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);


const checkCommandInstall = async (command: string): Promise<string> => {
  const rc: string = (await exec(command)).stderr
  if (rc.includes('not found')) {
    throw new Error(`
      ir-keytable not installed,
      sudo apt-get install ir-keytable -y
      https://github.com/gordonturner/ControlKit/blob/master/Raspbian%20Setup%20and%20Configure%20IR.md
    `);
  }

  return 'success'
}

export { checkCommandInstall }