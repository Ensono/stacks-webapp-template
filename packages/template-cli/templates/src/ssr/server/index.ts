import * as AI from "applicationinsights"
import bodyParser from "body-parser"
import express from "express"
import next from "next"
import conf from "../environment-configuration"
import api from "./api"
import logger from "./core/root-logger"
import errorHandler from "./middlewares/error-handler"
import helmetGuard from "./middlewares/helmet"
import httpLogger from "./middlewares/http-logger"

let appInsights = AI
if (!process.env.CI) {
    appInsights
        .setup()
        .setAutoCollectConsole(true)
        .start()
}

const port = parseInt(conf.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"
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

        server.get("*", (req, res) => handle(req, res))

        server.use(errorHandler)

        let start = Date.now()
        server.listen(port, err => {
            if (err) throw err
            let duration = Date.now() - start

            appInsights?.defaultClient?.trackMetric({
                name: "Server startup time",
                value: duration,
            })

            logger.info(
                `> Ready on ${conf.APP_BASE_URL}:${port}${conf.APP_BASE_PATH}`,
                "server",
            )
        })
    })
    .catch((ex: any) => {
        logger.error(ex.stack, "server")
        process.exit(1)
    })
