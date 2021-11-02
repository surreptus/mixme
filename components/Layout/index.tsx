import React, { ReactNode } from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children: ReactNode
}

export default function Layout ({ children }: Props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Header />

      {children}
    </Box>
  )
}
