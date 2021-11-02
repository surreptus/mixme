import React from 'react'
import Head from 'next/head'
import Layout from 'components/Layout'
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
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
    <Layout>
      <Head>
        <title>
          Mixme - { drink.name }
        </title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid height='100vh' width='100%' columnGap='12' templateColumns={"1fr 1.61fr"}>
        <GridItem sx={{ overflow: 'hidden' }}>
          <Image
            sx={{ position: 'sticky', top: 0 }}
            width='100%'
            height='100%'
            objectFit={'cover'}
            src={drink.cover.url}
          />
        </GridItem>

        <GridItem>
          <Heading
            variant='italic'
            pt='12'
            left='-6rem'
            sx={{ position: 'relative' }}
            size={'3xl'}
            mb={1}
          >
            {drink.name}
          </Heading>

          <Text>{drink.caption}</Text>

          <Text>{drink.description}</Text>

          <Box my={6}>
            <Heading size={'lg'} mb={2}>Ingredients</Heading>

            <UnorderedList>
              {drink.ingredients.map((ingredient: any) => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
              ))}
            </UnorderedList>
          </Box>


          <Heading size={'lg'} mb={2}>Instructions</Heading>
          {drink.instructions.json.content.map((node: any) =>
             node.content.map((paragraph: any) =>
              <Text key={paragraph.value}>
                {paragraph.value}
              </Text>
            )
          )}
        </GridItem>
      </Grid>
    </Layout>
  )
}
