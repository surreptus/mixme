import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Header from 'components/Header'

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/aldu54hpd72j',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': 'Bearer 8K4htsV045PUGte1GMjM2NstYN5CZn8SyMBNZfakhDo'
  }
});

export async function getStaticProps () {
  const { data }= await client.query({
    query: gql`
    query GetDrinks {
  drinkCollection(limit:20) {
    total,
    items {
      name
    }
  }
}`
  }) as any

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

        {drinks.map((drink: any) => drink.name)}
      </main>

      <footer>
        Copyright Mixme 2020
      </footer>
    </div>
  )
}
