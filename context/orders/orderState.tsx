import React, { useReducer } from 'react';
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';
import { TYPES } from '../../types';
import { InitialStateType, ClientType, ProductType, OrderContextType } from '../../interfaces';


const OrderState = ({children}: {children: React.ReactNode}) => {

    const initialState: InitialStateType = {
        client: {},
        products: [],
        total: 0
    }

    const [state, dispatch] = useReducer(OrderReducer, initialState);

    const addClient = (client:ClientType) => {
        dispatch({
            type: TYPES.SELECT_CLIENT,
            payload:client
        })
    }

    const addProducts = (productlist:ProductType[]) => {

        let newState: ProductType[];

        if(state.products.length > 0) {

            newState = productlist.map(product => {
                const newObject = state.products.find((productState:ProductType) => productState.id === product.id);
                return {
                    ...product,
                    ...newObject
                }
            })

        } else {
            newState = productlist;
        }

        dispatch({
            type: TYPES.SELECT_PRODUCTS,
            payload:newState
        })
    }

    const updateProductQuantity = (product:ProductType) => {
        dispatch({
            type:TYPES.PRODUCT_QUANTITY,
            payload: product
        })
    }

    const updateTotal = () => {
        dispatch({
            type:TYPES.UPDATE_TOTAL
        })
    }

    const values: OrderContextType = {
        client:state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProducts,
        updateProductQuantity,
        updateTotal
    }

    return (
        <OrderContext.Provider
            value={values}
        >
            {children}
        </OrderContext.Provider>
    )
}

export default OrderState;