import { useState } from 'react';
import { useRouter } from 'next/router';
///////////////////////////////////////////////////
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
///////////////////////////////////////////////////
import Layout from '../components/Layout';
//////////////////////////////////////////
import { showMsg } from '../helpers';
import { AUTHENTICATE_USER } from '../graphql';
//////////////////////////////////////////////////

export default function Login() {

  const [msg, setMsg] = useState('');

  const [ authenticateUser ] = useMutation(AUTHENTICATE_USER);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email is invalid').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must have at least 6 characters'),
    }),
    onSubmit: async values => {

      const { email, password } = values;

      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password
            }
          }
        })

        setMsg('Hold on, we are validating your information...');

        const { token } = data.authenticateUser;
        localStorage.setItem('token', token);

        setTimeout(() => {
          setMsg(null);
          router.push('/')
        }, 3000);

      } catch (error) {
        setMsg(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          setMsg(null);
        }, 3000);
      }
    }
  })

  return (
    <>
      <Layout>

        {msg && showMsg(msg)}

        <h1 className="text-2xl text-center font-light text-white">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label 
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >Email</label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email" 
                  type="email"
                  placeholder="Email"
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
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >Password</label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password" 
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
              ) : null}

              <input 
                type="submit" 
                value="Log in"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}
