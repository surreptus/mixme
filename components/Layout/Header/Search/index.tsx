import React, { ChangeEvent, useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { Input } from '@chakra-ui/react'

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
      }
    }
  }
`
export default function Search () {
  const [query, setQuery] = useState('')
  const [getRecipes] = useLazyQuery(GET_RECIPES, { variables: {
    query
  }});
  
  useEffect(() => {
    if (!query) {
      return
    }

    getRecipes()
  }, [query])

  return (
    <div>
      <Input
        size='lg'
        variant='unstyled'
        type='text'
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        placeholder='Start searching for a drink'
      />
    </div>
  )
}
