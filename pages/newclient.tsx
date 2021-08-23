import { useState } from 'react';
import { useRouter } from 'next/router';
///////////////////////////////////////////
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
//////////////////////////////////////////
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
//////////////////////////////////////////
import { showMsg } from '../helpers';
import { NEW_CLIENT, GET_CLIENTS_FROM_USER } from '../graphql';
/////////////////////////////////////////


export default function NewClient() {

  const router = useRouter();

  const [msg, setMsg] = useState('');

  const [ newClient, { loading } ] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_FROM_USER});

      cache.writeQuery({
        query: GET_CLIENTS_FROM_USER,
        data: {
          getClientsSeller: [...getClientsSeller, newClient ]
        }
      })

    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      company: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Last name is required'),
      company: Yup.string().required('Name is required'),
      email: Yup.string().email('Email is invalid').required('Email is required')
    }),
    onSubmit: async values => {

      const { name, lastname, company, email, phone } = values

      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastname,
              company,
              email,
              phone
            }
          }
        });

        router.push('/')

      } catch (error) {
        setMsg(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          setMsg('');
        }, 3000);
      }
    }
  })

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">New client</h1>
        {msg && showMsg(msg)}
        <div className="flex justify-center mt-">
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
                      placeholder="Client's name"
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
                      htmlFor="lastname"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >Last name</label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastname" 
                      type="text"
                      placeholder="Client's last name"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.lastname}</p>
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
                      value={formik.values.company}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.company && formik.errors.company ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.company}</p>
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
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
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
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <input 
                    type="submit" 
                    value="Register client"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                  />
            </form>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}