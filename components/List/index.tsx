import React from 'react'
import Link from 'next/link'
import { Text, Image, Wrap, WrapItem } from '@chakra-ui/react'

interface Props {
  items: any[];
}

export default function List ({ items }: Props) {
  return (
    <Wrap>
    {items.map((drink) => (
      <Link key={drink.sys.id} href={`/recipes/${encodeURIComponent(drink.sys.id)}`}>
        <WrapItem>
          <Image src={drink.cover} />

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
