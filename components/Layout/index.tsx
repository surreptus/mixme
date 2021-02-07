import React, { ReactNode } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: ReactNode
}

export default function Layout ({ children }: Props) {
  return (
    <Grid sx={{ minHeight: '100vh' }} templateRows='auto 8rem'>
      <Header />

      <GridItem>
        {children}
      </GridItem>

      <Footer />
    </Grid>
  )
}
