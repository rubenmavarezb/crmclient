import { useRouter } from 'next/router';
import Link from 'next/link';
////////////////////////////////////////////////
import { useQuery } from '@apollo/client';
///////////////////////////////////////////////
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
//////////////////////////////////////////
import { Client } from '../types'
import { GET_CLIENTS_FROM_USER } from '../graphql'
//////////////////////////////////////////////

export default function Home() {

  const { data, loading, error } = useQuery(GET_CLIENTS_FROM_USER);

  const router = useRouter();

  if(loading) {
    return <Spinner/>
  }

  const toLogin = () => {
    if(!data.getClientsSeller) {
      router.push('/login')
      console.log(error);
      return <Spinner/>
    }
  }

  return (
    <>
      {data.getClientsSeller ? (
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
          <Link href="/newclient">
            <a href="" className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">New Client</a>
          </Link>

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
