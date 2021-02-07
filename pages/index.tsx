import Head from 'next/head'
import Layout from 'components/Layout'
import List from 'components/List'
import { gql } from '@apollo/client';
// import { useTranslation } from 'react-i18next'
import { Heading, Container } from '@chakra-ui/react'
import client from 'utilities/apollo'

/**
 * return the newest drinks so we can pre-render the page
 */

export async function getStaticProps () {
  const { data } = await client.query({
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
// const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <title>Mixme - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth='80rem'>
        <Heading pt='12'>
          Latest Drinks
        </Heading>
        <List items={drinks} />
      </Container>
    </Layout>
  )
}
