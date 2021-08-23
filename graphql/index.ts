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