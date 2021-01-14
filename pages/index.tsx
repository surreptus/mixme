import Head from 'next/head'
import Layout from 'components/Layout'
import List from 'components/List'
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/aldu54hpd72j',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': 'Bearer 8K4htsV045PUGte1GMjM2NstYN5CZn8SyMBNZfakhDo'
  }
});

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
        <h1>
          Test
        </h1>

        hello

        <List items={drinks} />
      </main>
    </Layout>
  )
}
