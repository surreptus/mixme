import React from 'react'
import { Link, Grid, GridItem } from '@chakra-ui/react'

import Search from './Search'

export default function Header () {
  return (
    <header>
      <Grid p='2' gap='2' templateColumns="repeat(5, 1fr)">
        <GridItem>
          mixme
        </GridItem>

        <GridItem colSpan={3}>
          <Search />
        </GridItem>

        <GridItem>
          <Link>
            About
          </Link>
        </GridItem>
      </Grid>
    </header>
  )
}
