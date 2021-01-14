import Head from 'next/head'
import Layout from 'components/Layout'
import List from 'components/List'
import { gql } from '@apollo/client';
import { Heading } from '@chakra-ui/react'
import client from 'utilities/apollo'

export async function getStaticProps () {
  const { data }= await client.query({
    query: gql`query GetDrinks {
      drinkCollection(limit:20) {
        total,
        items {
          sys {
            id
          },
          name,
          caption,
          cover {
            url,
            title,
            description
          }
        }
      }
    }`
  })

  return {
    props: { drinks: data.drinkCollection.items }
  }
}

interface Props {
  drinks: any[];
}

export default function Home ({ drinks }: Props) {
  return (
    <Layout >
      <Head>
        <title>Mixme - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>
          Latest Drinks
        </Heading>

        <List items={drinks} />
      </main>
    </Layout>
  )
}
