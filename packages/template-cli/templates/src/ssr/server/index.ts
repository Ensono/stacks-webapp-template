import next from "next"
import express from "express"
import bodyParser from "body-parser"
import helmetGuard from "./middlewares/helmet"
import errorHandler from "./middlewares/error-handler"
import httpLogger from "./middlewares/http-logger"
import logger from "./core/root-logger"
import api from "./api"
import conf from "../environment-configuration"
import * as appInsights from "applicationinsights"
import {resolve} from "path"

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
        if (conf.APPINSIGHTS_INSTRUMENTATIONKEY) {
            appInsights
                .setup(conf.APPINSIGHTS_INSTRUMENTATIONKEY)
                .setAutoCollectConsole(true)
                .start()
        }
        server.use(httpLogger)

        server.use(bodyParser.urlencoded({extended: false}))
        server.use(bodyParser.json())
        server.use(/\/((?!_next).)*/, httpLogger)
        
        server.get(`/favicon.ico`, (req, res) =>
            app.serveStatic(
                req,
                res,
                resolve("./static/icons/favicon.ico"),
            ),
        )

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
