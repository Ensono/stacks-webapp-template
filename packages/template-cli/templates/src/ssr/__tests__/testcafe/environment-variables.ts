require("dotenv").config()

export const environmentVariables = {
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BASE_PATH: process.env.APP_BASE_PATH,
    MENU_API_URL: process.env.MENU_API_URL,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
}

export const getAppUrl = () => {
    console.log(`Currently running in: ${environmentVariables.NODE_ENV}`)
    if (environmentVariables.NODE_ENV === "development") {
        return { APP_URL: `${environmentVariables.APP_BASE_URL}:${environmentVariables.PORT}${environmentVariables.APP_BASE_PATH}` }
    }
    return { APP_URL: `${environmentVariables.APP_BASE_URL}${environmentVariables.APP_BASE_PATH}` }
}
