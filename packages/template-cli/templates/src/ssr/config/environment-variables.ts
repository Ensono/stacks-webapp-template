const APP_ENVIRONMENT_VARIABLES = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_BASE_PATH: process.env.APP_BASE_PATH || '',
    MENU_API_URL: process.env.MENU_API_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    POD_NAME: process.env.POD_NAME,
    FNC_NAME: process.env.FNC_NAME,
};

export default APP_ENVIRONMENT_VARIABLES;
