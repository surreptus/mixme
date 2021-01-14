import React from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/aldu54hpd72j',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': 'Bearer 8K4htsV045PUGte1GMjM2NstYN5CZn8SyMBNZfakhDo'
  }
});

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
        instructions {
          json
        }
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
        <title>Mixme - {drink.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid my={5} templateColumns={"repeat(2, 1fr)"} gap={6}>
        <GridItem colSpan={1}>
          <Box position={'relative'}>
            <AspectRatio width={'100%'} ratio={4 / 3}>
              <Image objectFit={'cover'} src={drink.cover.url} />
            </AspectRatio>
            <Box
              my={3}
              position={'absolute'}
              top={-12}
              left={-4}
            >
              <Heading size={'3xl'} mb={1}>{drink.name}</Heading>
              <Text>{drink.caption}</Text>
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Text>{drink.description}</Text>

          <Box my={6}>
            <Heading size={'lg'} mb={2}>Ingredients</Heading>
            <UnorderedList>
              {drink.ingredients.map((ingredient: any) => (
                <ListItem>{ingredient}</ListItem>
              ))}
            </UnorderedList>
          </Box>


          <Heading size={'lg'} mb={2}>Instructions</Heading>
          {drink.instructions.json.content.map((node: any) =>
             node.content.map((paragraph: any) =>
              <Text>{paragraph.value}</Text>
            )
          )}
        </GridItem>
      </Grid>
    </Layout>
  )
}
