module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BASE_PATH: process.env.APP_BASE_PATH || "",
    MENU_API_URL: process.env.MENU_API_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    POD_NAME: process.env.POD_NAME,
    APPINSIGHTS_KEY: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,

    AUTH0_BASE_URL: `${process.env.APP_BASE_URL}:${process.env.PORT}`,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_CALLBACK_URL: `${process.env.APP_BASE_URL}:${process.env.PORT}/callback`,

    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: process.env.REDIS_PORT || "6379",
    REDIS_ENABLED: process.env.REDIS_ENABLED || false,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || null,

    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
        process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
        process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
    NEXT_PUBLIC_CONTENTFUL_DEFAULT_LOCALE:
        process.env.NEXT_PUBLIC_CONTENTFUL_DEFAULT_LOCALE || "en-GB",
}
