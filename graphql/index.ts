import { gql } from '@apollo/client';


//queries
export const GET_CLIENTS_FROM_USER = gql`
  query getClientsSeller {
    getClientsSeller{
      id
      name
      lastname
      company
      email
    }
  }
`;

export const GET_USER = gql`
    query getUser {
        getUser {
            id
            name
            lastname
        }
    }
`;

export const GET_CLIENT = gql`
  query getClient($id:ID!) {
    getClient(id:$id) {
      id
      name
      lastname
      email
      phone
      company
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id:ID!) {
    getProduct(id:$id) {
      id
      name
      stock
      price
    }
  }
`;

export const GET_ORDERS_FROM_SELLER = gql`
  query getOrdersBySeller {
    getOrdersBySeller {
      id
      order {
        id
        quantity
        name
      }
      client {
        id
        name
        lastname
        email
        phone
      }
      seller
      total
      state
    }
  }
`;

export const GET_ORDERS_FROM_SELLER_ID = gql`
  query getOrdersBySeller {
    getOrdersBySeller {
      id
    }
  }
`;

//mutations
export const NEW_ACCOUNT = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastname
      email
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

export const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastname
      company
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id:$id)
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      id
      name
      lastname
      email
      phone
      company
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id:$id)
  }
`;

export const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      stock
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      name
      stock
      price
    }
  }
`;

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      state
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id:$id)
  }
`;