import { useFormik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';
//////////////////////////////////////////
import Layout from '../components/Layout';
//////////////////////////////////////////

export default function NewClient() {

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      company: '',
      email: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Last name is required'),
      company: Yup.string().required('Name is required'),
      email: Yup.string().email('Email is invalid').required('Email is required'),
    }),
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">New client</h1>
      
        <div className="flex justify-center mt-">
          <div className="w-full max-w-lg">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
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
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}