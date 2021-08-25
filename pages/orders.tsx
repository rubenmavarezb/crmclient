import Link from 'next/link';
import Layout from '../components/Layout';

export default function Orders() {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>

      <Link
          href="/neworder"
        >
          <a 
            className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm"
          >New Order</a>
        </Link>
    </Layout>

  )
}
