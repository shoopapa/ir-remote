import { getReceiverInfo, IrDevice} from "./get-receiver-info/getReceiverInfo";
import util from 'util'
import child_process from 'child_process'
import * as path from 'path'
import * as process from 'process'
import * as fs from 'fs'
const exec = util.promisify(child_process.exec);


class Ir {
  public receiver: IrDevice;
  public transmiter: IrDevice;
  private timeout: number;


  constructor() {
    this.receiver = {lirc: "", rc: ""}
    this.transmiter = {lirc: "", rc: ""}
    this.timeout = parseInt(process.env.SCANTIMEOUT ?? "4000",10)
  }

  async init() {
    const { receiver, transmiter } = await getReceiverInfo()
    console.log(transmiter, receiver)
    this.receiver = receiver
    this.transmiter = transmiter
  }

  private filePath(name:string | null): string {
    if (name === null){
      return path.join(process.cwd(), 'pulses')
    }
    return path.join(process.cwd(), 'pulses', name)
  }

  private async testForPulseFile(file:string) {
    const list = await fs.readdirSync(this.filePath(null))
    if ( list.includes(file) ) {
      return true
    }
    return false
  }

  async sendProtocol(protocol:string, scancode:string) {
    const command =`ir-ctl --scancode=${protocol}:${scancode} -d /dev/${this.transmiter.lirc}`
    console.log('sendProtocol', command)
    await exec(command)
    return `transmitted scancode (${protocol}:${scancode})`
  }

  async sendFile(file:string) {
    const exists  = await this.testForPulseFile(file)
    if ( !exists ) {
      return `This file (${file}) already exists!`
    }
    const command =`ir-ctl --send=${this.filePath(file)} -d /dev/${this.transmiter.lirc}`
    console.log('sendFile', command)
    await exec(command)
    return `Transmitted file ${file}`
  }

  save(file:string): Promise<string> {
    const save = new Promise<string>( async (resolve, reject) => {
      const t = setTimeout(() => {
        fs.unlinkSync(this.filePath(file))
        reject(`Save file timed out (${file})`)
      }, this.timeout );

      const exists  = await this.testForPulseFile(file)
      console.log('exists',exists)
      if ( exists ) {
        clearTimeout(t)
        reject(`this file (${file}) already exists!`)
      } else {
        const command =`ir-ctl --receive=${this.filePath(file)} -1 -d /dev/${this.receiver.lirc}`
        console.log(command)
        await exec(command)
        clearTimeout(t)
        resolve("success! ")
      }
    })

    return save
  }

  async deleteFile(file:string):Promise<string> {
    const exists  = await this.testForPulseFile(file)
    if ( !exists ) {
      return `This file (${file}) does not exist, Can't delete it`
    }
    try {
      fs.unlinkSync(this.filePath(file))
      return `Successfully removed ${file}`
    } catch (e) {
      console.log(e)
      return "failed to delete file"
    }
  }
  
}

export {Ir}