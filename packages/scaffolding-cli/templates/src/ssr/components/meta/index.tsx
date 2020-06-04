import Head from "next/head"
import theme from "../../config/theme"

// const {publicRuntimeConfig} = getConfig()
// const {APP_BASE_URL, APP_BASE_PATH} = publicRuntimeConfig

export default function Meta() {
    return (
        <Head>
            <meta name="theme-color" content={theme.palette.secondary.main} />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
            />
            <link
                rel="icon"
                type="image/x-icon"
                href="/static/icons/favicon.ico"
            />
            <meta
                property="og:image"
                content="/static/icons/favicon-96x96.png"
            />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta
                name="msapplication-config"
                content="/static/icons/browserconfig.xml"
            />
            <link rel="manifest" href="/static/icons/manifest.json" />
            <meta
                name="description"
                content="Amido stacks prototype project built using NextJS and Node"
            />
        </Head>
    )
}
