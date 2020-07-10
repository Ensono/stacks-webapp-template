import {serialize} from "cookie"
import Redis from "ioredis"
import connectRedis from "connect-redis"
import uid from "uid-safe"
import session from "express-session"

export const setPassportSessionCookie = (isRedisEnabled, conf): session.SessionOptions => {
    // Express session for Auth
    const RedisStore = connectRedis(session)
    let redisClient = null

    if (isRedisEnabled) {
        redisClient = new Redis(
            conf.REDIS_PORT, // Redis port
            conf.REDIS_HOST, // Redis host
            {
                password: conf.REDIS_PASSWORD || null,
                keepAlive: 3600,
                connectTimeout: 150000
            })
    }

    const sessionConfig = {
        store: !isRedisEnabled
            ? null
            : new RedisStore({
                  client: redisClient,
                  logErrors: error => console.warn("session error: ", error),
              }),
        secret: uid.sync(18),
        cookie: {
            maxAge: 86400 * 1000, // 24 hours in milliseconds
            secure: process.env.NODE_ENV === "production",
        },
        resave: false,
        saveUninitialized: false,
        rolling: false,
    }
    return sessionConfig
}

export function removePassportCookie(res, cookie_name) {
    if (!cookie_name) return
    const cookie = serialize(cookie_name, "", {
        maxAge: -1,
    })

    res.setHeader("Set-Cookie", cookie)
    return res
}
