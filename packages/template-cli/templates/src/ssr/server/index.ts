import next from 'next'
import express from 'express'
import bodyParser from 'body-parser'

import helmetGuard from './middlewares/helmet'
import errorHandler from './middlewares/error-handler'

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

    server.use(bodyParser.urlencoded({extended: false}))
    server.use(bodyParser.json())

    server.get('/', (req, res) => app.render(req, res, '/', req.query))

    server.all('*', (req, res) => handle(req, res))

    server.use(errorHandler)

    server.listen(port, err => {
      if (err) throw err
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex: any) => {
    console.error(ex.stack)
    process.exit(1)
  })
