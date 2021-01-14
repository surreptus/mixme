import React from 'react'
import Link from 'next/link'
import { Text, Image, Wrap, WrapItem } from '@chakra-ui/react'

interface Props {
  items: any[];
}

export default function List ({ items }: Props) {
  console.log(items)
  return (
    <Wrap>
    {items.map((drink) => (
      <Link key={drink.sys.id} href={`/recipes/${encodeURIComponent(drink.sys.id)}`}>
        <WrapItem w='50%'>
          <Image objectFit='cover' alt={drink.name} src={drink.cover.url} boxSize='lg' />

          <Text>
            {drink.name}
          </Text>

          <Text>
            {drink.caption}
          </Text>
        </WrapItem>
      </Link>
    ))}
    </Wrap>
  )
}
