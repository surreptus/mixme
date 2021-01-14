import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/aldu54hpd72j',
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': `Bearer ${process.env.CONTENTFUL_API_KEY}`
  }
});

