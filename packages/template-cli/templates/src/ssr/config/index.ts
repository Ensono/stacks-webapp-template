import APP_ENVIRONMENT_VARIABLES from "./environment-variables";

const conf = {
    ...APP_ENVIRONMENT_VARIABLES,
    MY_STATIC_APP_VARIABLE: "anything static across environments goes here",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    PRODUCTION: process.env.NODE_ENV !== "development",
    my_other_var: 'foo',
    some_other: 'foobar'
};

export default conf;
