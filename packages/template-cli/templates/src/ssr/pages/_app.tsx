import {ThemeProvider} from "@material-ui/core/styles"
import withReduxSaga from "next-redux-saga"
import withRedux from "next-redux-wrapper"
import App, {AppContext, AppInitialProps} from "next/app"
import getConfig from "next/config"
import React from "react"
import {Provider} from "react-redux"
import {Store} from "redux"
import {withApplicationInsights} from "utils/appInsightsLogger"
import theme from "../config/theme"
import configureStore from "../state-management"
import CssBaseline from "@material-ui/core/CssBaseline"

interface AppStore extends Store {}

export interface AppWithStore extends AppInitialProps {
    store: AppStore
}

class _App extends App<AppWithStore> {
    /**
     * UNCOMMENT this depending on if you DO NOT want [Automatic Static optimisation](https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md)
     */
    static async getInitialProps({
        Component,
        ctx,
    }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}

        return {pageProps}
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side")
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }

    render() {
        const {Component, pageProps, store} = this.props
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </Provider>
        )
    }
}

const appInsightsConfig = {
    instrumentationKey: getConfig().publicRuntimeConfig.APPINSIGHTS_KEY,
    isEnabled: true,
}

export default withRedux(configureStore)(
    withReduxSaga(withApplicationInsights(appInsightsConfig)(_App)),
)
