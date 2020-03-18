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
                    <meta
                        name="theme-color"
                        content={theme.palette.secondary.main}
                    />
                    <link
                        rel="icon"
                        type="image/x-icon"
                        href={`${APP_BASE_URL}${APP_BASE_PATH}/static/icons/favicon.ico`}
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
