import React, {  useContext } from 'react';
//////////////////////////////////////////
import OrderContext from '../../context/orders/orderContext';
//////////////////////////////////////////
import { ProductType, OrderContextType } from '../../interfaces';
//////////////////////////////////////////
import ProductSummary from './ProductSummary';
//////////////////////////////////////////

const OrderSummary = () => {

    const orderContext: OrderContextType = useContext(OrderContext);
    const { products } = orderContext;

    return (
        <>
            <p
                className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
            >3.- Adjust product's quantity</p>

            {products.length !== 0 ? (
                <>
                    {products.map((product:ProductType) => (
                        <ProductSummary
                            key={product.id}
                            {...product}
                        />
                    ))}
                </>
            ) : <p className="mt-5 text-sm">No products yet</p>}
        </>
     );
}
 
export default OrderSummary;