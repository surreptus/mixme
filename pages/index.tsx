import Head from 'next/head'
import Header from 'components/Header'
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
    <div>
      <Head>
        <title>Mixme - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h1>
          Test
        </h1>

        <List items={drinks} />
      </main>

      <footer>
        Copyright Mixme 2020
      </footer>
    </div>
  )
}
