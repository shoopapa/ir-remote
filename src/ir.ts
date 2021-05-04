import { getReceiverInfo } from "./get-receiver-info/getReceiverInfo";

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
}

export {Ir}