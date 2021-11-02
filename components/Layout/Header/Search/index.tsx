import React, { ChangeEvent, useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { Container, Text, Input } from '@chakra-ui/react'
import Link from 'next/link'
import styled from '@emotion/styled'

const GET_RECIPES = gql`
  query($query: String!) {
    drinkCollection(
      where: {
        name_contains: $query,
        description_contains: $query
      },
      limit: 20
    ) {
      items {
        name,
        caption,
        sys {
          id
        }
      }
    }
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 4rem;
  height: calc(100vh - 4rem);
  background-color: black;
  z-index: 100;
  left: 0;
  width: 100vw;
`

export default function Search () {
  const [query, setQuery] = useState('')
  const [getRecipes, { loading, data }] = useLazyQuery(GET_RECIPES, { variables: {
    query
  }});
  
  useEffect(() => {
    if (!query) {
      return
    }

    getRecipes()
  }, [query])

  return (
    <>
      <Input
        size='lg'
        variant='unstyled'
        type='text'
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        placeholder='Start searching for a drink'
      />

      {
        (data?.drinkCollection.items.length > 0) && (
          <Overlay>
            <Container>
              {data && data.drinkCollection.items.map((drink: any) => (
                <Link key={drink.sys.id} href={`/recipes/${encodeURIComponent(drink.sys.id)}`}>
                  <Text>
                    {drink.name}
                  </Text>
                </Link>
              ))}
            </Container>
          </Overlay>
        )
      }
    </>
  )
}
