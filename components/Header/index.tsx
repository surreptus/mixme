import React from 'react'
import { Link, Input, Grid, GridItem } from '@chakra-ui/react'

export default function Header () {
  return (
    <header>
      <Grid p='2' gap='2' templateColumns="repeat(5, 1fr)">
        <GridItem>
          mixme
        </GridItem>

        <GridItem colSpan={3}>
          <Input placeholder='Start searching for a drink' />
        </GridItem>

        <GridItem>
          <Link>
            About
          </Link>
        </GridItem>
      </Grid>
      mixme
    </header>
  )
}
