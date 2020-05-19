// import {reactAI} from "react-appinsights"
import {ReactPlugin} from "@microsoft/applicationinsights-react-js"
import {
    ApplicationInsights,
    IExceptionTelemetry,
    SeverityLevel,
} from "@microsoft/applicationinsights-web"
import {createBrowserHistory} from "history"

const reactPlugin = new ReactPlugin()
const instrumentationKey = process.env.APPINSIGHTS_KEY
const browserHistory = createBrowserHistory({basename: ""})

let debug = false
let maxBatchSize = 250

if (process.env.NODE_ENV !== "production") {
    // for development/testing
    debug = true
    maxBatchSize = 0 // send telemetry as soon as it's collected
}

let appInsights: ApplicationInsights

export function setUpAppInsights() {
    const config = {
        instrumentationKey,
        maxBatchSize,
        enableAutoRouteTracking: true,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: {
                debug,
                history: browserHistory,
            },
        },
    }

    appInsights = new ApplicationInsights({
        config,
    })
    appInsights.loadAppInsights()
}

export function trackError(err: Error): void {
    const error = new Error(err.message)
    const exceptionTelemetry: IExceptionTelemetry = {
        error,
        properties: {
            message: error.message,
        },
        severityLevel: SeverityLevel.Error,
    }
    appInsights.trackException(exceptionTelemetry)
}
