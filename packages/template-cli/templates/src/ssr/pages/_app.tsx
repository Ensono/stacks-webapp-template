import App from "next/app";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

class _App extends App {
    /**
     * UNCOMMENT this depending on if you DO NOT want [Automatic Static optimisation](https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md)
    */
    // static async getInitialProps({ Component, ctx }) {
    //     let pageProps = {};
    //     if (Component.getInitialProps) {
    //         pageProps = await Component.getInitialProps(ctx);
    //     }

    //     return { pageProps };
    // }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <StylesProvider injectFirst>
                <Component {...pageProps} />
            </StylesProvider>
        );
    }
}

export default _App;
