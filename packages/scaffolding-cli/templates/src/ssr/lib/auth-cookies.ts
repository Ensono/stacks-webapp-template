import {serialize} from "cookie"
import Redis from "ioredis"
import connectRedis from "connect-redis"
import uid from "uid-safe"
import session from "express-session"

export const setPassportSessionCookie = (isRedisEnabled, conf) => {
    // Express session for Auth
    let RedisStore = connectRedis(session)
    let redisClient = null

    if (isRedisEnabled) {
        redisClient = new Redis({
            port: conf.REDIS_PORT, // Redis port
            host: conf.REDIS_HOST, // Redis host
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
