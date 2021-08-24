import React, { useState } from 'react';
import { useRouter } from 'next/router';
/////////////////////////////////////////
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
//////////////////////////////////////////
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
//////////////////////////////////////////
import { showMsg } from '../helpers';
import { NEW_PRODUCT, GET_PRODUCTS } from '../graphql';
//////////////////////////////////////////
 
const NewProduct = () => {

    const router = useRouter();
    const [msg, setMsg] = useState('');

    const [ newProduct, { loading } ] = useMutation(NEW_PRODUCT, {
        update(cache, { data: { newProduct } }) {
          const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });
    
          cache.writeQuery({
            query: GET_PRODUCTS,
            data: {
              getProducts: [...getProducts, newProduct ]
            }
          })
    
        }
    });

    const formik = useFormik({
        initialValues: {
          name: '',
          price: '',
          stock: '',
        },
        validationSchema: Yup.object({
          name: Yup.string().required('Name is required'),
          price: Yup.number().required('Price is required').positive('Only positive numbers'),
          stock: Yup.number().required('Stock is required').positive('Only positive numbers').integer('Only integer numbers'),
        }),
        onSubmit: async values => {
    
          const { name, price, stock } = values
    
          try {
            const { data } = await newProduct({
              variables: {
                input: {
                  name,
                  price: Number(price),
                  stock: parseInt(stock),
                }
              }
            });

            Swal.fire(
                'Created',
                'Product has been created successfully',
                'success'
            )

            router.push('/products');
    
          } catch (error) {
            setMsg(error.message.replace('GraphQL error: ', ''));
    
            setTimeout(() => {
                setMsg('');
            }, 3000);
          }
        }
      })

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New product</h1>

            {msg && showMsg(msg)}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    {loading && <Spinner/>}
                    {!loading && (
                    <form
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label 
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                            >Name</label>

                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name" 
                            type="text"
                            placeholder="Product's name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.name && formik.errors.name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.name}</p>
                        </div>
                        ) : null}

                        <div className="mb-4">
                            <label 
                            htmlFor="price"
                            className="block text-gray-700 text-sm font-bold mb-2"
                            >Price</label>

                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price" 
                            type="text"
                            placeholder="Product's Price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.price && formik.errors.price ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.price}</p>
                        </div>
                        ) : null}

                        <div className="mb-4">
                            <label 
                            htmlFor="stock"
                            className="block text-gray-700 text-sm font-bold mb-2"
                            >Stock</label>

                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="stock" 
                            type="text"
                            placeholder="Product's stock"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.stock && formik.errors.stock ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.stock}</p>
                        </div>
                        ) : null}

                        <input 
                            type="submit" 
                            value="Create product"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                        />
                    </form>
                    )}
                </div>
            </div>
        </Layout>
     );
}
 
export default NewProduct;