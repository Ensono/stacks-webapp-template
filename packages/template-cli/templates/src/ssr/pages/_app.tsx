import App from "next/app";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

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
