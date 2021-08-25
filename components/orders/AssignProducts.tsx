import React, { useEffect, useState, useContext } from 'react';
//////////////////////////////////////////
import Select from 'react-select';
import { useQuery } from '@apollo/client';
//////////////////////////////////////////
import OrderContext from '../../context/orders/orderContext';
//////////////////////////////////////////
import { GET_PRODUCTS } from '../../graphql';
import { ProductType, OrderContextType } from '../../interfaces';
//////////////////////////////////////////
import Spinner from '../Spinner';
//////////////////////////////////////////

const AssignProducts = () => {

    const orderContext: OrderContextType = useContext(OrderContext);
    const { addProducts } = orderContext;

    const [products, setProducts] = useState<ProductType[]>([]);

    const { data, loading, error } = useQuery(GET_PRODUCTS);

    const selectProduct = (productlist:any) => {
        setProducts(productlist)
    }

    useEffect(() => {
        if(products.length !== 0) {
            addProducts(products)
        }
    }, [products]);

    if(loading) return <Spinner/>

    const getProducts: ProductType[] = data?.getProducts;

    return (
        <>
            <p
                className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
            >2.- Assign products to this order</p>
            <Select
                className="mt-3"
                options={ getProducts }
                isMulti={true}
                onChange={ (option) => selectProduct(option) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => `${options.name} - ${options.stock} ${options.stock === 1 ? 'Disponible' : 'Disponibles'}` }
                placeholder="Select your client"
                noOptionsMessage={() => "No client found"}
            />
        </>
     );
}
 
export default AssignProducts;