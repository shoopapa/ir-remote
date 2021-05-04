import util from 'util'
import child_process from 'child_process'
const exec = util.promisify(child_process.exec);

interface IrDevice {
  lirc: string;
  rc: string

}

const getReceiverInfo = async (): Promise<{ receiver: IrDevice, transmiter: IrDevice }> => {
  const receiverCommand = 'ir-keytable'
  const receiverResponse: string = (await exec(receiverCommand)).stderr ?? ""
  if (receiverResponse.includes('not found')) {
    throw new Error(`
    ir-keytable not installed,
    sudo apt-get install ir-keytable -y
    https://github.com/gordonturner/ControlKit/blob/master/Raspbian%20Setup%20and%20Configure%20IR.md
    `);
  }
  const receiverLine: string | undefined = (receiverResponse.split('\n').find(s=> s.includes('LIRC device')))
  if (receiverLine === undefined) {
    throw new Error("ir-keytable failed to parse")
  }
  const receiverNum = receiverLine.split("").pop()
  if (receiverNum === undefined) {
    throw new Error("ir-keytable failed to decivper what device is being used")
  }

  const transCommand = 'ir-ctl --features'
  const transResponse = (await exec(transCommand)).stdout
  const transLine: string | undefined = (transResponse.split('\n').find(s=> s.includes('Send features')))
  if (transLine === undefined) {
    throw new Error('"ir-ctl --features" failed to parse')
  }
  const transNum: string | undefined = transLine.split("")[transLine.length - 2]
  if (transNum === undefined) {
    throw new Error("ir-ctl failed to decivper what device is being used")
  }

  const receiver: IrDevice = { lirc: "lirc" + receiverNum, rc: "rc" + receiverNum }
  const transmiter: IrDevice = { lirc: "lirc" + transNum, rc: "rc" + transNum }
  return { receiver, transmiter }
}

export { getReceiverInfo, IrDevice }