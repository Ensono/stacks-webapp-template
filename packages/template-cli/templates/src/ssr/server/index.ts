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
import cacheableResponse from "cacheable-response"

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

const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({req, res, pagePath, queryParams}) => {
        const data = await app.renderToHTML(req, res, pagePath, queryParams)

        // Add here custom logic for when you do not want to cache the page, for
        // example when the page returns a 404 status code:
        if (res.statusCode === 404) {
            res.end(data)
            return
        }

        return {data}
    },
    send: ({data, res}) => res.send(data),
    getKey:(req) => undefined,
})

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
        server.get("/", (req, res) => ssrCache({req, res, pagePath: "/"}))

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
