import React from 'react';
import Link from 'next/link';
//////////////////////////////////////////
import { useQuery } from '@apollo/client';
//////////////////////////////////////////
import { GET_PRODUCTS } from '../graphql';
import { ProductType } from '../interfaces';
//////////////////////////////////////////
import Layout from '../components/Layout';
import Product from '../components/Product';
import Spinner from '../components/Spinner';
//////////////////////////////////////////

export default function Products() {

  const { data, loading, error } = useQuery(GET_PRODUCTS);  

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Products</h1>

        <Link
          href="/newproduct"
        >
          <a 
            className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm"
          >New product</a>
        </Link>

        {loading && <Spinner/>}
        {!loading && (
          <table className="table-auto shadow-md mt-10 w-full w-lg">

            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Stock</th>
                <th className="w-1/5 py-2">Price</th>
                <th className="w-1/5 py-2">Edit</th>
                <th className="w-1/5 py-2">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.getProducts.map((prod: ProductType) => (
                <Product
                  key={prod.id}
                  {...prod}
                />
              ))}
            </tbody>
          </table>
        )}

      </Layout>
    </>
  )
}
