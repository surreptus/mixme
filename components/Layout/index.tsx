import React, { ReactNode } from 'react'
import { Grid, Container } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: ReactNode
}

export default function Layout ({ children }: Props) {
  return (
    <Grid sx={{ minHeight: '100vh' }} templateRows='8rem auto 8rem'>
      <Header />

      <Container>
        {children}
      </Container>

      <Footer />
    </Grid>
  )
}
