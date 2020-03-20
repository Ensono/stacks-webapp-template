/*
* Pulls in the base confifratio
*/

export const environmentVariables = {
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BASE_PATH: process.env.APP_BASE_PATH,
    MENU_API_URL: process.env.MENU_API_URL,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
}

export const getAppUrl = () => {
    console.log(`Currently running in: ${environmentVariables.NODE_ENV}`)
    if (environmentVariables.NODE_ENV === "production") {
        return {
            APP_URL: `${environmentVariables.APP_BASE_URL}${environmentVariables.APP_BASE_PATH}`,
        }
    }
    console.error("Detected non-production Node environment. Note: a locally served webapp must be running in order to run tests in NODE_ENV=dev.")
    // Assumes that you have a webapp that can be run locally. This is ideal for generating tests without relying on deployments to an environment.
    return  {
        APP_URL: `${environmentVariables.APP_BASE_URL}:${environmentVariables.PORT}/${environmentVariables.APP_BASE_PATH}`
    }
}
