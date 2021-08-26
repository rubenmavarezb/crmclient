import React, { useState, useEffect } from 'react';
//////////////////////////////////////////
import Spinner from './Spinner';
//////////////////////////////////////////
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
//////////////////////////////////////////
import { OrderType } from '../interfaces';
import { UPDATE_ORDER, DELETE_ORDER, GET_ORDERS_FROM_SELLER_ID } from '../graphql';
//////////////////////////////////////////

 
const Order = (props: OrderType) => {

    const { client, client: { name, lastname, phone, email }, id, order, seller, state, total } = props;

    const [orderStatus, setOrderStatus] = useState(state);
    const [css, setCSS] = useState('');

    const [updateOrder, { loading }] = useMutation(UPDATE_ORDER);
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        update(cache) {
            const { getOrdersBySeller } = cache.readQuery({
                query:GET_ORDERS_FROM_SELLER_ID
            });

            cache.writeQuery({
                query: GET_ORDERS_FROM_SELLER_ID,
                data: {
                    getOrdersBySeller: getOrdersBySeller.filter((orders:OrderType) => orders.id !== id)
                }
            })
        }
    });

    const statusCSS = () => {
        if (orderStatus === 'PENDING') {
            setCSS('border-yellow-500');
        } else if(orderStatus === 'COMPLETED') {
            setCSS('border-green-500');
        } else {
            setCSS('border-red-800'); 
        }
    }

    const updateOrderStatus = async (status:string) => {
        try {
            const { data } = await updateOrder({
                variables: {
                    id,
                    input: {
                        state: status,
                        client: client.id
                    }
                }
            });

            setOrderStatus(data.updateOrder.state);
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDeleteOrder = () => {
        Swal.fire({
            title: `Are you sure you want to delete this order?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {

                try {

                    const { data } = await deleteOrder({
                        variables: {
                            id
                        }
                    })

                    console.log(data)

                    Swal.fire(
                        'Deleted!',
                        data.deleteOrder,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
            }
          })
    }

    useEffect(() => {
        if(orderStatus) {
            setOrderStatus(orderStatus);
        }
        statusCSS();
    }, [orderStatus])

    return ( 
        <div className={`${css} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">Client: {name} {lastname}</p>
                {email && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                        {email}
                    </p>
                )}
                {phone && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {phone}
                    </p>
                )}
                <h2 className="font-bold text-gray-800 mt-10">Status:</h2>

                {loading && (
                    <div
                        className="flex items-center justify-start w-6 h-6"
                    >
                        <Spinner/>
                    </div>
                )}
                {!loading && (
                    <select 
                        className="mt-2 appearance-none font-bold bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight foucs:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs"
                        value={orderStatus}
                        onChange={e => updateOrderStatus( e.target.value )}
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELED">CANCELED</option>
                    </select>
                )}
            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-2">Order Summary</h2>

                {order.map(article => (
                    <div
                        key={article.id}
                        className="mt-4"
                    >
                        <p className="text-sm text-gray-600">Producto: {article.name} </p>
                        <p className="text-sm text-gray-600">Cantidad: {article.quantity}</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">
                    Total: <span className="font-light">$ {total}</span>
                </p>

                <button
                    className="flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold"
                    onClick={() => confirmDeleteOrder()}
                >
                    Delete Order
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        </div>
     );
}
 
export default Order;