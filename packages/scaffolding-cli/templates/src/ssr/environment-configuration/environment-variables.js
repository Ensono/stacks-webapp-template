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

    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
        process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "veka2or2977j",
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN:
        process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN:
        process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ||
        "4JrZBpD7-sDb_qjD4KB3Z34eNtCR1QqgvnCYlKqZ4Wg",
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET:
        process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET || "",
}
