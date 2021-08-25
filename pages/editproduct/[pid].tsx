import React, { useState } from 'react';
import { useRouter } from 'next/router';
//////////////////////////////////////////
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
//////////////////////////////////////////
import { showMsg } from '../../helpers';
import { GET_PRODUCT, UPDATE_PRODUCT } from '../../graphql';
///////////////////////////////////////////////////
import { ProductType } from '../../interfaces';
/////////////////////////////////////////
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
/////////////////////////////////////////
 
const EditProduct = () => {

    const [msg, setMsg] = useState('');

    const router = useRouter();
    const { query: { productid } } = router;

    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: {
            id:productid
        }
    });

    const [ updateProduct ] = useMutation(UPDATE_PRODUCT);

    const updateProductInfo = async (values:ProductType)=> {

        const { name, price, stock } = values;

        try {
            const { data } = await updateProduct( {
                variables: {
                    id: productid,
                    input: {
                        name, 
                        stock: Number(stock),
                        price: Number(price),
                    }
                }
            });

            Swal.fire(
                'Updated',
                'Product has been updated successfully',
                'success'
            )

            router.push('/products');
        } catch(error) {
            setMsg(error.message.replace('GraphQL error: ', ''));

            setTimeout(() => {
              setMsg('');
            }, 3000);
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').positive('Only positive numbers'),
        stock: Yup.number().required('Stock is required').positive('Only positive numbers').integer('Only integer numbers'),
    })

    const getProduct = data?.getProduct;

    return ( 
    <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Edit client</h1>
        {msg && showMsg(msg)}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            {loading && <Spinner/>}
            {!loading && (
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={ getProduct }
                    onSubmit={ (values) => {
                        updateProductInfo(values)
                    }}
                >
                    {props => {
                        return (
                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
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
                                        placeholder="Client's name"
                                        value={props.values?.name || ''}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                
                                {props.touched.name && props.errors.name ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.name}</p>
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
                                        type="number"
                                        placeholder="Product's Price"
                                        value={props.values?.price || 0}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                
                                {props.touched.price && props.errors.price ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.price}</p>
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
                                        type="number"
                                        placeholder="Product's stock"
                                        value={props.values?.stock || 0}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                
                                {props.touched.stock && props.errors.stock ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.stock}</p>
                                    </div>
                                ) : null}

                                <input 
                                    type="submit" 
                                    value="Edit product"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                />
                            </form>
                        );
                    }}
                </Formik>
            )}
          </div>
        </div>
      </Layout>
     );
}
 
export default EditProduct;