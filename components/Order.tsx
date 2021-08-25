import React, { useState, useEffect } from 'react';
import { OrderType } from '../interfaces';

 
const Order = (props: OrderType) => {

    const { client, id, order, seller, state, total } = props;

    const [orderStatus, setOrderStatus] = useState(state);

    useEffect(() => {
        if(orderStatus) {
            setOrderStatus(orderStatus);
            console.log('cagaste')
        }
    }, [orderStatus])

    return ( 
        <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
            <div>
                <p className="font-bold text-gray-800">Client: {client}</p>
                <h2 className="font-bold text-gray-800 mt-10">Status:</h2>

                <select 
                    className="mt-2 appearance-none font-bold bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight foucs:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs"
                    value={orderStatus}
                    onChange={e => setOrderStatus(e.target.value)}
                >
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELED">CANCELED</option>
                </select>
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
                >
                    Delete Order
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        </div>
     );
}
 
export default Order;