/* istanbul ignore file */
import * as AI from "applicationinsights"
import cacheableResponse from "cacheable-response"
import bodyParser from "body-parser"
import express from "express"
import next from "next"
import session from "express-session"
import api from "./api"
import logger from "./core/root-logger"
import errorHandler from "./middlewares/error-handler"
import { helmetGuard, removeXPoweredByHeader } from "./middlewares/helmet"
import httpLogger from "./middlewares/http-logger"
import conf from "../environment-configuration"
import {setPassportSessionCookie} from "../lib/auth-cookies"
import { passportMiddleware, restrictAccess } from "./middlewares/authentication"

const appInsights = AI
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY && process.env.APPINSIGHTS_INSTRUMENTATIONKEY !== "" ) {
    appInsights.setup().setAutoCollectConsole(true).start()
}

const port = parseInt(process.env.PORT || "3000", 10)
const authenticationEnabled =
    !!conf.AUTH0_CLIENT_SECRET && !!conf.AUTH0_CLIENT_ID
const isRedisEnabled =
    conf.REDIS_ENABLED && !process.env.CI && authenticationEnabled
const app = next({dev: process.env.NODE_ENV !== "production", dir: "."})
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

        return { data }
    },
    send: ({data, res}) => res.send(data),
    getKey: req => undefined,
})

export default app
    .prepare()
    .then(() => {
        const server = express()
        if (authenticationEnabled) {
            const sessionConfig = setPassportSessionCookie(isRedisEnabled, conf)
            server.use(session(sessionConfig))
            const passport = passportMiddleware()
            //initialize Passport disabled for e2e testing
            server.use(passport.initialize())
            server.use(passport.session())
            // TODO: this is an example of importing middleware selectively
            if (process.env.ENABLE_AUTHORIZATION) {
                server.use(restrictAccess)
            }
        }

        server.use(helmetGuard)
        server.use(removeXPoweredByHeader)
        server.use(httpLogger)
        server.use(bodyParser.urlencoded({extended: false}))
        server.use(bodyParser.json())
        server.use(/\/((?!_next).)*/, httpLogger)
        server.use(api)
        server.get("/", (req, res) => ssrCache({req, res, pagePath: "/"}))

        server.get("*", (req, res) => handle(req, res))

        server.use(errorHandler)

        const start = Date.now()
        server.listen(port, err => {
            if (err) throw err
            const duration = Date.now() - start

            appInsights?.defaultClient?.trackMetric({
                name: "Server startup time",
                value: duration,
            })

            logger.info(
                `> Ready on ${process.env.APP_BASE_URL}:${port}${process.env.APP_BASE_PATH}`,
                "server",
            )
            logger.info(
                `running server in ${
                    process.env.NODE_ENV !== "production" ? "dev" : "production"
                }`,
                " mode",
            )
        })
    })
    .catch((ex: any) => {
        logger.error(ex.stack, "server")
        process.exit(1)
    })
