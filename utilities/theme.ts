import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  config: {
    initialColorMode: 'dark'
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box'
      },
      body: {
        padding: 0,
        margin: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      },
      a: {
        color: 'inherit',
        textDecoration: 'none'
      },
    },
  },
  colors: {
    100: 'red'
  }
})
