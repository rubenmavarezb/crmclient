import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import fetch from 'cross-fetch';


const httpLink = createHttpLink({
    fetch,
    uri: 'http://localhost:4000/'
});

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink as any) as any
});

export default client;