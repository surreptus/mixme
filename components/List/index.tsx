import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { Stack, AspectRatio, Heading, Text, Image, Grid, Box} from '@chakra-ui/react'

interface Props {
  items: any[];
}

const Card = styled(Box)`
  cursor: pointer;

  .go {
    visibility: hidden;
  }

  &:hover .go {
    visibility: visible;
  }
`

export default function List ({ items }: Props) {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={12}>
    {items.map((drink) => (
      <Link key={drink.sys.id} href={`/recipes/${encodeURIComponent(drink.sys.id)}`}>
        <Card flex='0 32%'>
          <Stack spacing={4}>
            <AspectRatio ratio={1}>
              <Image objectFit='cover' alt={drink.name} src={drink.cover.url} />
            </AspectRatio>

            <Heading size='md'>
              {drink.name}
            </Heading>

            <Text>
              {drink.caption} <Text color='orange.500' className='go'>Click to discover</Text>
            </Text>
          </Stack>
        </Card>
      </Link>
    ))}
    </Grid>
  )
}
