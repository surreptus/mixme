import { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import theme from 'utilities/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
