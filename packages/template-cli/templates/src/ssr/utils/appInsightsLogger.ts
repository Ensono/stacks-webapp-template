import React from "react"
import {AppProps, default as NextApp, AppContext} from "next/app"
import * as packageConfig from "../package.json"
import {
    ApplicationInsights,
    IConfiguration,
    IConfig,
} from "@microsoft/applicationinsights-web"

const IS_BROWSER = typeof window !== "undefined"

interface WithApplicationInsightsProps {
    pageName: string
}

declare global {
    interface Window {
        appInsights?: ApplicationInsights
    }
}

let appInsights: ApplicationInsights

export interface ICustomConfig {
    isEnabled: boolean
}

export const withApplicationInsights = (
    config: IConfiguration & IConfig & ICustomConfig,
) => {
    return (App: typeof NextApp) => {
        return class WithApplicationInsights extends React.Component<
            WithApplicationInsightsProps & AppProps
            > {
            annotationString = `${packageConfig.name}: ${packageConfig.version}`
            public static getInitialProps = async (appCtx: AppContext) => {
                let appProps = {pageProps: {}}
                if (App.getInitialProps) {
                    appProps = {
                        ...appProps,
                        ...(await App.getInitialProps(appCtx)),
                    }
                }
                return {
                    ...appProps,
                }
            }

            public componentDidMount() {
                this.initializeAppInsights()
                this.trackPageView()
                this.customTrace(
                    `AppInsights for ${this.annotationString} Initialized`,
                )
            }

            public componentDidCatch(error: Error) {
                if (appInsights) {
                    appInsights.trackException({exception: error})
                }
            }

            public initializeAppInsights() {
                if (
                    IS_BROWSER &&
                    config.isEnabled &&
                    !!config.instrumentationKey &&
                    !appInsights
                ) {
                    appInsights = new ApplicationInsights({config})
                    appInsights.loadAppInsights()
                    window.appInsights = appInsights
                }
            }

            public customTrace(msg: string) {
                if (appInsights) {
                    appInsights.trackTrace({
                        message: msg.concat(this.annotationString),
                        severityLevel: 1,
                    })
                    appInsights.flush()
                }
            }

            public trackPageView() {
                if (appInsights) {
                    const name =
                        this.props.Component.displayName ||
                        this.props.Component.name ||
                        location.pathname
                    const properties = {
                        route: this.props.router.route,
                        project_name: packageConfig.name,
                        version: packageConfig.version
                    }
                    if (this.props.router.query) {
                        for (const key in this.props.router.query) {
                            properties[
                                `query.${key}`
                            ] = this.props.router.query[key]
                        }
                    }
                    appInsights.trackPageView({name, properties})
                }
            }

            public render() {
                this.trackPageView()
                return React.createElement(App, this.props)
            }
        }
    }
}
