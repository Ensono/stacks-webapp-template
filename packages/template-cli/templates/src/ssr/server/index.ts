import next from 'next'
import express from 'express'
import bodyParser from 'body-parser'

import helmetGuard from './middlewares/helmet'
import errorHandler from './middlewares/error-handler'
import httpLogger from './middlewares/http-logger'
import logger from './core/root-logger'
import api from './api'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
app.renderOpts.poweredByHeader = false

export default app
  .prepare()
  .then(() => {
    const server = express()
    server.use(helmetGuard)
    server.use(httpLogger)

    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())
    server.use(/\/((?!_next).)*/, httpLogger)

    server.use(api)
    
    server.get('*', (req, res) => handle(req, res))

    server.use(errorHandler)

    server.listen(port, err => {
      if (err) throw err
      logger.info(`> Ready on http://localhost:${port}`, 'server')
    })
  })
  .catch((ex: any) => {
    logger.error(ex.stack, 'server')
    process.exit(1)
  })
