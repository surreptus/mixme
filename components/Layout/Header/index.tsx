import React from 'react'
import { Link, Grid, GridItem } from '@chakra-ui/react'
import styled from '@emotion/styled'

// import Search from './Search'

const AppBar = styled.header`
position: fixed;
`

export default function Header () {
  return (
    <AppBar>
      <Grid p='2' gap='2' templateColumns="repeat(5, 1fr)">
        <GridItem>
          <Link href='/'>mixme</Link>
        </GridItem>

        <GridItem colSpan={3}>
          {/* <Search /> */}
        </GridItem>

        <GridItem />
      </Grid>
    </AppBar>
  )
}
