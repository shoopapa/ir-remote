const util = require('util');
const exec = util.promisify(require('child_process').exec);


const getReceiverInfo = async (command) => {
  // const rc: string = (await exec(command)).stderr
  // if (rc.includes('not found')) {
  //   throw new Error(`
  //     ir-keytable not installed,
  //     sudo apt-get install ir-keytable -y
  //     https://github.com/gordonturner/ControlKit/blob/master/Raspbian%20Setup%20and%20Configure%20IR.md
  //   `);
  // }

  

  const test = `Found /sys/class/rc/rc1/ (/dev/input/event0) with:
  Name: gpio_ir_recv
  Driver: gpio_ir_recv, table: rc-rc6-mce
  LIRC device: /dev/lirc1
  Supported kernel protocols: other lirc rc-5 rc-5-sz jvc sony nec sanyo mce_kbd rc-6 sharp xmp imon 
  Enabled kernel protocols: lirc rc-5 rc-5-sz jvc sony nec sanyo mce_kbd rc-6 sharp xmp imon 
  bus: 25, vendor/product: 0001:0001, version: 0x0100`

  const lirc: string = test.split('\n').find(s=> s.includes('LIRC device')).split("/")[2]
  const rc: string = "rc" + lirc.split('')[lirc.length - 1]

  const ret = { rc, lirc }
  console.log(ret)
  return ret
}

export { getReceiverInfo }