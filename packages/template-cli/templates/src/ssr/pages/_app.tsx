import {ThemeProvider} from "@material-ui/core/styles"
import App, {AppInitialProps, AppContext} from "next/app"
import React from "react"
import {withApplicationInsights} from "utils/appInsightsLogger"
import getConfig from "next/config"
import {createMuiTheme} from "@material-ui/core/styles"
import withReduxSaga from "next-redux-saga"
import withRedux from "next-redux-wrapper"
import configureStore from '../state-management';
import { Provider } from "react-redux"
import {Store} from "redux"
interface AppStore extends Store {
}

export interface AppWithStore extends AppInitialProps {
    store: AppStore;
}


const AmidoTheme = createMuiTheme({
    palette: {
        primary: {main: "#000000"},
        secondary: {main: "#FECB07"},
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "5px",
                fontSize: "13px",
                textTransform: "none",
            },
            contained: {
                boxShadow: "0px",
                textTransform: "uppercase",
            },
        },
    },
    typography: {
        fontFamily: ["Work sans", "Arial"].join(","),
    },
})

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

    render() {
        const {Component, pageProps, store} = this.props
        return (
            <Provider store={store}>
                <ThemeProvider theme={AmidoTheme}>
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

export default withRedux(configureStore)(withReduxSaga(withApplicationInsights(appInsightsConfig)(_App)))