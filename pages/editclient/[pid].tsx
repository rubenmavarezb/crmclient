import React, { useState } from 'react';
import { useRouter } from 'next/router';
//////////////////////////////////////////
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
//////////////////////////////////////////
import { showMsg } from '../../helpers';
import { GET_CLIENT, UPDATE_CLIENT } from '../../graphql';
///////////////////////////////////////////////////
import { ClientType } from '../../types';
/////////////////////////////////////////
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
/////////////////////////////////////////

export interface EditClientProps {
    
}
 
const EditClient = () => {

    const [msg, setMsg] = useState('');

    const router = useRouter();
    const { query: { clientid } } = router;

    const { data, loading, error } = useQuery(GET_CLIENT, {
        variables: {
            id:clientid
        }
    });

    const [ updateClient ] = useMutation(UPDATE_CLIENT);

    const updateClientInfo = async (values:ClientType)=> {
        const { name, lastname, company, email, phone } = values;

        try {
            const { data } = await updateClient( {
                variables: {
                    id: clientid,
                    input: {
                        name, 
                        lastname, 
                        company, 
                        email, 
                        phone
                    }
                }
            });

            Swal.fire(
                'Updated',
                'Client has been updated successfully',
                'success'
            )

            router.push('/');
        } catch(error) {

        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        lastname: Yup.string().required('Last name is required'),
        company: Yup.string().required('Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required')
    })

    const getClient = data?.getClient;

    return ( 
    <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Edit client</h1>
        {msg && showMsg(msg)}
        <div className="flex justify-center mt-">
          <div className="w-full max-w-lg">
            {loading && <Spinner/>}
            {!loading && (
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={ getClient }
                    onSubmit={ (values) => {
                        updateClientInfo(values)
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
                                        htmlFor="lastname"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >Last name</label>
        
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastname" 
                                        type="text"
                                        placeholder="Client's last name"
                                        value={props.values?.lastname || ''}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                
                                {props.touched.lastname && props.errors.lastname ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.lastname}</p>
                                    </div>
                                ) : null}
    
                                <div className="mb-4">
                                    <label 
                                        htmlFor="company"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >Company</label>
            
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="company" 
                                        type="text"
                                        placeholder="Client's company"
                                        value={props.values?.company || ''}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                
                                {props.touched.company && props.errors.company ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.company}</p>
                                    </div>
                                ) : null}
        
                                <div className="mb-4">
                                    <label 
                                        htmlFor="email"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >Email</label>
            
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email" 
                                        type="email"
                                        placeholder="Client's email"
                                        value={props.values?.email || ''}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
    
                                {props.touched.email && props.errors.email ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.email}</p>
                                    </div>
                                ) : null}
    
                                <div className="mb-4">
                                    <label 
                                        htmlFor="phone"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >Phone number</label>
            
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="phone" 
                                        type="tel"
                                        placeholder="Client's phone number"
                                        value={props.values?.phone || ''}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    value="Edit client"
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
 
export default EditClient;