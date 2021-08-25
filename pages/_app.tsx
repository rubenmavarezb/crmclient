import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import OrderState from '../context/orders/orderState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp
