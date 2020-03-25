import React from "react"
import Document, {Head, Main, NextScript} from "next/document"
import {ServerStyleSheets} from "@material-ui/core/styles"
import theme from "../config/theme"
import getConfig from "next/config"

const {publicRuntimeConfig} = getConfig()
const {APP_BASE_URL, APP_BASE_PATH} = publicRuntimeConfig
export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en">
                <Head>
                    <title>Amido stacks</title>
                    <meta
                        name="theme-color"
                        content={theme.palette.secondary.main}
                    />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                        key="viewport"
                    />
                    <link
                        rel="icon"
                        type="image/x-icon"
                        href={`${APP_BASE_URL}${APP_BASE_PATH}/static/icons/favicon.ico`}
                    />
                    <meta
                        property="og:image"
                        content={`${APP_BASE_URL}${APP_BASE_PATH}/static/icons/favicon-96x96.png`}
                    />
                    <meta name="msapplication-TileColor" content="#000000" />
                    <meta
                        name="msapplication-config"
                        content={`${APP_BASE_URL}${APP_BASE_PATH}/static/icons/browserconfig.xml`}
                    />
                    <link
                        rel="manifest"
                        href={`${APP_BASE_URL}${APP_BASE_PATH}/static/icons/manifest.json`}
                    />
                    <meta
                        name="description"
                        content="Amido stacks prototype project built using NextJS and Node"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />),
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
    }
}
