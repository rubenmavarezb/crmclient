import { TYPES } from '../../types';
import { InitialStateType, Actions } from '../../interfaces';

const OrderReducer = (state:InitialStateType, action:Actions) => {
    const { type, payload } = action;
    switch (type) {
        case TYPES.SELECT_CLIENT: 
            return {
                ...state,
                client: payload
            }
        case TYPES.SELECT_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case TYPES.PRODUCT_QUANTITY: 
            return {
                ...state,
                products: state.products.map( product => product.id === payload.id ? product = payload : product)
            }
        case TYPES.UPDATE_TOTAL: 
            return {
                ...state,
                total: state.products.reduce((newTotal, product) => newTotal += product.price * product.quantity, 0)
            }
        default:
            return state;
    }
}

export default OrderReducer;