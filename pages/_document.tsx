import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from "@chakra-ui/react"
import theme from 'utilities/theme'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: any) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />

          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
