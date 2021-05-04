import express from 'express'
import {Ir} from '../ir'
const app = express()

const ir = new Ir()
ir.init()

app.get('/', (req, res) => {
  // req.params
  res.send( ir.rc );
})

app.get('scan', (req, res) => {

  res.send( "Hello world!" );
})


export {app}

