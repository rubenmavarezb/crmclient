import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
///////////////////////////////////////////////
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { Client } from '../types'
//////////////////////////////////////////////

const GET_CLIENTS_FROM_USER = gql`
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


export default function Home() {

  const { data, loading, refetch } = useQuery(GET_CLIENTS_FROM_USER);

  const router = useRouter();

  console.log(data)

  if(loading) {
    refetch()
    return <Spinner/>
  }

  const toLogin = () => {
    if(!data.getClientsSeller) {
      router.push('/login')
      return <Spinner/>
    }
  }

  return (
    <>
      {data.getClientsSeller ? (
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

          <table className="table-auto shadow-md mt-10 w-full w-lg">

            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Company</th>
                <th className="w-1/5 py-2">Email</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.getClientsSeller.map((client: Client) => (
                <tr key={client.id}>
                  <td className="border px-4 py-2">{client.name} {client.lastname}</td>
                  <td className="border px-4 py-2">{client.company}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Layout>
      ) : toLogin() }

    </>
  )
}
