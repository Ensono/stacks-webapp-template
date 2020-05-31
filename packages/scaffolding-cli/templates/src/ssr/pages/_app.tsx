import CssBaseline from "@material-ui/core/CssBaseline"
import {ThemeProvider} from "@material-ui/core/styles"
import Notifier from "components/Notifier"
import App, {AppInitialProps} from "next/app"
import Head from "next/head"
import React from "react"
import {Store} from "redux"
import {withApplicationInsights} from "utils/appInsightsLogger"
import theme from "../config/theme"
import {wrapper} from "../state-management"

interface AppStore extends Store {}

export interface AppWithStore extends AppInitialProps {
    store: AppStore
}

class _App extends App<AppWithStore> {
    /**
     * UNCOMMENT this depending on if you DO NOT want [Automatic Static optimisation](https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md)
     */
    static async getInitialProps({Component, ctx}): Promise<AppInitialProps> {
        const pageProps = {
            ...(Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}),
        }
        // if (!process.env.CI && ctx.req && ctx.req.session.passport) {
        //     pageProps.user = ctx.req.session.passport.user
        // }
        // if (ctx.req) {
        //     ctx.store.dispatch(END)
        //     await ctx.store.sagaTask.toPromise()
        // }
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
                    <title>Amido Stacks SSR</title>
                </Head>

                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...props} />
                    <Notifier />
                </ThemeProvider>
            </>
        )
    }
}

const appInsightsConfig = {
    instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    isEnabled: true,
}

export default wrapper.withRedux(
    withApplicationInsights(appInsightsConfig)(_App),
)
