import React from 'react';
import Router from 'next/router';
///////////////////////////////////////////////////
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
///////////////////////////////////////////////////
import { DELETE_CLIENT, GET_CLIENTS_FROM_USER } from '../graphql';
///////////////////////////////////////////////////
import { ClientType } from '../types';
///////////////////////////////////////////////////



 
const Client = (props: ClientType) => {

    const { id, name, lastname, company, email } = props;

    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        update(cache) {
            const { getClientsSeller } = cache.readQuery({ query: GET_CLIENTS_FROM_USER });

            cache.evict({ broadcast: false });

            cache.writeQuery({
                variables: { id },
                query: GET_CLIENTS_FROM_USER,
                data: {
                    getClientsSeller: getClientsSeller.filter((currentClient:ClientType) => currentClient.id !== id)
                }
            })
        }
    });

    const editClient = (clientid:string) => {
        Router.push({
            pathname: '/editclient/[id]',
            query: { clientid }
        })
    }

    const confirmDeleteClient = (clientid:string) => {
        Swal.fire({
            title: `Are you sure you want to delete client: ${name} ${lastname}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {

                try {

                    const { data } = await deleteClient({
                        variables: {
                            id:clientid
                        }
                    })

                    Swal.fire(
                        'Deleted!',
                        data.deleteClient,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
          })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{name} {lastname}</td>
            <td className="border px-4 py-2">{company}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => editClient(id)}
                >
                    Edit
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmDeleteClient(id)}
                >
                    Delete
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
        </tr>
      );
}
 
export default Client;