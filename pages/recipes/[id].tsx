import React from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import { Flex, Box, AspectRatio, Text, Image } from '@chakra-ui/react'
import { gql } from '@apollo/client';
import client from 'utilities/apollo'

interface Props {
  drink: any
}

export async function getStaticPaths () {
  const { data } = await client.query({
    query: gql`query GetPaths {
      drinkCollection(limit:20) {
        total,
        items {
          sys {
            id
          }
        }
      }
    }`
  })

  const paths = data.drinkCollection.items.map((drink: any) => ({
    params: { id: drink.sys.id }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context: any) {
  const { data } = await client.query({
    query: gql`query GetDrink($id: String!) {
      drink(id: $id) {
        name
        caption
        cover {
          title
          description
          url
        }
        ingredients
        description

      }
    }`,
    variables: {
      id: context.params.id
    }
  })

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      drink: data.drink
    }
  }
}

export default function Show ({ drink }: Props) {
  return (
    <Layout >
      <Head>
        <title>Mixme - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex>
        <Box flex='1'>
          <AspectRatio maxW='20rem' ratio={4 / 3}>
            <Image src={drink.cover.url} />
          </AspectRatio>

          <Text>
            {drink.name}
          </Text>

          <Text>
            {drink.caption}
          </Text>

          <Text>
            {drink.ingredients}
          </Text>

        </Box>

        <Box flex='1'>
          <Text>
            {drink.description}
          </Text>

          <Text>
            {drink.recipe}
          </Text>
        </Box>
      </Flex>
    </Layout>
  )
}
