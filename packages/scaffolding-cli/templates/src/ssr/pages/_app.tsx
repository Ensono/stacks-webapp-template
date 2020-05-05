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
import Notifier from "components/Notifier"
import Head from "next/head"

interface AppStore extends Store {}

export interface AppWithStore extends AppInitialProps {
    store: AppStore
}

class _App extends App<AppWithStore> {
    /**
     * UNCOMMENT this depending on if you DO NOT want [Automatic Static optimisation](https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md)
     */
    static async getInitialProps({Component, ctx}): Promise<AppInitialProps> {
        const pageProps: any = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}
        if (ctx.req && ctx.req.session.passport) {
            pageProps.user = ctx.req.session.passport.user
        }
        return {pageProps}
    }

    constructor(props) {
        super(props)
        this.state = {
            user: props.pageProps.user,
        }
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
        const props = {
            ...pageProps,
            user: this.state,
        }
        return (
            <>
                <Head>
                    <title>Amido stacks</title>
                </Head>

                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...props} />
                        <Notifier />
                    </ThemeProvider>
                </Provider>
            </>
        )
    }
}

const appInsightsConfig = {
    instrumentationKey: getConfig().serverRuntimeConfig
        .APPINSIGHTS_INSTRUMENTATIONKEY,
    isEnabled: true,
}

export default withRedux(configureStore)(
    withReduxSaga(withApplicationInsights(appInsightsConfig)(_App)),
)
