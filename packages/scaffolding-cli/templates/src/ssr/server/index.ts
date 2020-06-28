/* istanbul ignore file */
import * as AI from "applicationinsights"
import bodyParser from "body-parser"
import express from "express"
import next from "next"
import api from "./api"
import logger from "./core/root-logger"
import errorHandler from "./middlewares/error-handler"
import helmetGuard from "./middlewares/helmet"
import httpLogger from "./middlewares/http-logger"
import cacheableResponse from "cacheable-response"
import session from "express-session"

import passport from "passport"
import Auth0Strategy from "passport-auth0"
import conf from "../environment-configuration"
import {setPassportSessionCookie} from "../lib/auth-cookies"

let appInsights = AI
if (!process.env.CI) {
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

        return {data}
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
            //Configuring Auth0Strategy
            const auth0Strategy = new Auth0Strategy(
                {
                    domain: conf.AUTH0_DOMAIN,
                    clientID: conf.AUTH0_CLIENT_ID,
                    clientSecret: conf.AUTH0_CLIENT_SECRET,
                    callbackURL: conf.AUTH0_CALLBACK_URL,
                },
                function (
                    accessToken,
                    refreshToken,
                    extraParams,
                    profile,
                    done,
                ) {
                    return done(null, profile)
                },
            )

            //configuring Passport
            passport.use(auth0Strategy)
            passport.serializeUser((user, done) => done(null, user))
            passport.deserializeUser((user, done) => done(null, user))

            //initialize Passport disabled for e2e testing
            server.use(passport.initialize())
            server.use(passport.session())

            //restrict access to protected routes
            const restrictAccess = (req, res, next) => {
                if (!req.isAuthenticated()) return res.redirect("/login")
                next()
            }
        }

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
