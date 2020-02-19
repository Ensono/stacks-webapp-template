import { StylesProvider } from "@material-ui/core/styles";
import App from "next/app";
import React from "react";
import {withApplicationInsights} from "utils/appInsightsLogger"
import getConfig from "next/config"
class _App extends App {
    /**
     * UNCOMMENT this depending on if you DO NOT want [Automatic Static optimisation](https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md)
    */
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <StylesProvider injectFirst>
                <Component {...pageProps} />
            </StylesProvider>
        );
    }
}

export default withApplicationInsights({
    instrumentationKey: getConfig().publicRuntimeConfig.APPINSIGHTS_KEY,
    isEnabled: true, //process.env.NODE_ENV === 'production'
})(_App)
