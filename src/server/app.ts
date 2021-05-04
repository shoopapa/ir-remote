import express from 'express'
import {Ir} from '../ir'
const app = express()

const ir = new Ir()
ir.init()

app.get('/', (req, res) => {
  // req.params
  res.send( ir.receiver );
})

app.get('/send', async (req, res) => {

  const { protocol, scancode, file } = req.query
  if (typeof file === 'string') {
    ir.sendFile(file)
  } else if (typeof protocol === 'string' && typeof scancode === 'string') {
    ir.sendProtocol(protocol, scancode)
  }

  res.send( 'success!' );
})

app.get('/save', async (req, res) => {
  const { file } = req.query
  if (typeof file === 'string') {
    try {
      await ir.save(file)
      res.send( `
        Saved file (${file})! \n
        Send it through the transmiter by /send?file=${file}
      ` );
    } catch (e) {
      res.send( e );
    }
  } else {
    res.send( 'you need to define a name!' );
  }
})

app.get('/delete', async (req, res) => {
  const { file } = req.query
  if (typeof file === 'string') {
    const message = await ir.deleteFile(file)
    res.send( message )
  }
})




export {app}

