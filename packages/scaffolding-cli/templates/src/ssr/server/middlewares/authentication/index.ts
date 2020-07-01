/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import passport, { Passport, PassportStatic } from "passport"
import Auth0Strategy from "passport-auth0"
import conf from "../../../environment-configuration"

export function restrictAccess(req: Request, res: Response, next: NextFunction) {
    // if (!req.isAuthenticated()) return res.redirect("/login")
    if (!req.headers.authorization) return res.redirect("/login")
    return next()
}

export const passportMiddleware = (): PassportStatic => {
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
    // server.use(passport.initialize())
    // server.use(passport.session())
    return passport
}
