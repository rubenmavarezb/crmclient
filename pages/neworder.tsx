import React, { useContext } from 'react';
//////////////////////////////////////////
import OrderContext from '../context/orders/orderContext';
//////////////////////////////////////////
import Layout from '../components/Layout';
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';
import OrderSummary from '../components/orders/OrderSummary';
import OrderTotal from '../components/orders/OrderTotal';
//////////////////////////////////////////
 
const NewOrder = () => {

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Create product</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AssignClient/>
                    <AssignProducts/>
                    <OrderSummary/>
                    <OrderTotal/>

                    <button
                        type="button"
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}
                    >Create order</button>
                </div>
            </div>

        </Layout>
     );
}
 
export default NewOrder;