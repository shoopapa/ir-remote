import { getReceiverInfo } from "./get-receiver-info/getReceiverInfo";
import {spawn } from 'child_process'


class Ir {
  public rc: string;
  public lirc: string;


  constructor() {
    this.rc = ""
    this.lirc = ""
  }

  async init() {
    const { rc, lirc } = await getReceiverInfo('ir-keytable')
    this.rc = rc
    this.lirc = lirc
  }

  async scan1() {
    const command = `ir-keytable -t -s ${this.rc}`

    const ls = spawn(command);

    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      ls.kill('SIGHUP');
    });
  }
}

export {Ir}