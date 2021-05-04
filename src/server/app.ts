import express from 'express'
import {Ir} from '../ir'
const app = express()

const ir = new Ir()
ir.init()

app.get('/', (req, res) => {
  // req.params
  res.send( ir.rc );
})

app.get('scan/1', (req, res) => {
  ir.scan1()
  res.send( "Hello world!" );
})


export {app}

