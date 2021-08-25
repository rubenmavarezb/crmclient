import React, { useState, useContext, useEffect } from 'react';
//////////////////////////////////////////
import OrderContext from '../../context/orders/orderContext';
//////////////////////////////////////////
import { ProductType, OrderContextType } from '../../interfaces';
//////////////////////////////////////////

const ProductSummary = (props:ProductType) => {

    const orderContext: OrderContextType = useContext(OrderContext);
    const { updateProductQuantity, updateTotal } = orderContext;

    const [quantity, setQuantity] = useState('');

    const { name, price } = props;

    const updateQuantity = () => {
        const newProduct:ProductType = {
            ...props,
            quantity: Number(quantity)
        }

        updateProductQuantity(newProduct);
    }

    useEffect(() => {
        if(quantity) {
            updateQuantity();
            updateTotal()
        }
    }, [quantity])

    return (
        <div
            className="md:flex md:justify-between md:items-center mt-5"
        >
            <div
                className="md:w-2/4 mb-2 md:mb-0"
            >
                <p className="text-sm">
                    {name}
                </p>
                <p>$ {price}</p>
            </div>

            <input 
                type="number"
                placeholder="Qty"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="shadow apperance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
            />
        </div>
     );
}
 
export default ProductSummary;