import next from 'next'
import express from 'express'
import bodyParser from 'body-parser'
// import proxyMiddleware from 'http-proxy-middleware'

import helmetGuard from './middlewares/helmet'
import errorHandler from './middlewares/error-handler'
import httpLogger from './middlewares/http-logger'
import logger from './core/root-logger'
import api from './api'
import conf from '../config'

const port = parseInt(conf.PORT || '3000', 10)
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

    // server.use(
    //     proxyMiddleware("/", {
    //       target: `${conf.APP_BASE_URL}:${conf.PORT}/test/dontwork`,
    //       // a few more options
    //     }),
    //   )

    server.use(api)
    
    server.get('*', (req, res) => handle(req, res))

    server.use(errorHandler)

    server.listen(port, '127.0.0.1', err => {
      if (err) throw err
      logger.info(`> Ready on ${conf.APP_BASE_URL}:${port}/${conf.APP_BASE_PATH}`, 'server')
    })
  })
  .catch((ex: any) => {
    logger.error(ex.stack, 'server')
    process.exit(1)
  })
