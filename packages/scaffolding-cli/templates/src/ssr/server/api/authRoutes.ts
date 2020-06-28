import {Router} from "express"
import passport from "passport"
import logger from "../core/root-logger"
import cookie from "cookie"
import {removePassportCookie} from "../../lib/auth-cookies"

export default (router: Router) => {
    router.get(
        "/login",
        passport.authenticate("auth0", {
            scope: "openid email profile",
        }),
        (req, res) => {
            logger.info("/login route")
            return res.redirect("/")
        },
    )

    router.get("/callback", (req: any, res, next) => {
        passport.authenticate("auth0", (err, user) => {
            if (err) return next(err)
            if (!user) return res.redirect("/login")
            req.logIn(user, err => {
                if (err) {
                    logger.error(err)
                    return next(err)
                }
                logger.info("code exchange success")
                res.redirect("/profile")
            })
        })(req, res, next)
    })

    router.get("/logout", (req: any, res: any) => {
        removePassportCookie(res, "connect.sid")
        req.logout()
        const {AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_BASE_URL} = process.env
        res.redirect(
            `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${AUTH0_BASE_URL}`,
        )
        res.end()
    })

    router.get("/user", (req: any, res) => {
        // const session = cookie.parse(req.headers?.cookie || "")
        res.status(200).json({user: req.user || null})
    })
}
