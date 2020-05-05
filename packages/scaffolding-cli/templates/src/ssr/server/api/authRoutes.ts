import {Router} from "express"
import passport from "passport"
import getConfig from "next/config"
// const router = express.Router()

export default (router: Router) => {
    router.get(
        "/login",
        passport.authenticate("auth0", {
            scope: "openid email profile",
        }),
        (req, res) => res.redirect("/"),
    )

    router.get("/callback", (req: any, res, next) => {
        passport.authenticate("auth0", (err, user) => {
            if (err) return next(err)
            if (!user) return res.redirect("/login")
            req.logIn(user, err => {
                if (err) return next(err)
                res.redirect("/")
            })
        })(req, res, next)
    })

    router.get("/logout", (req: any, res) => {
        req.logout()
        const {publicRuntimeConfig} = getConfig()
        const {AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL} = publicRuntimeConfig
        res.redirect(
            `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`,
        )
    })
}
