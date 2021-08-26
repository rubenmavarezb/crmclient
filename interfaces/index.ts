import { TYPES } from '../types';

export type ClientType = {
    id:string;
    name: string;
    lastname:string;
    company:string;
    email: string;
    seller: string;
    phone: string;
}

export type ProductType = {
    __typename:string;
    id:string;
    name: string;
    stock: number;
    price: number;
    quantity?:number;
}

export type OrderGroup = {
    id:string;
    quantity:number;
    name:string;
}

export type OrderType = {
    id:string;
    client:ClientType;
    seller:string;
    state:string;
    total: number;
    order: OrderGroup[]
}

export type InitialStateType = {
    client: ClientType;
    products: ProductType[];
    total: number;
}

export type Actions = {
    type: TYPES;
    payload?: any
}

export type OrderContextType = InitialStateType & {
    addClient: (client:ClientType) => void;
    addProducts: (productlist:ProductType[]) => void;
    updateProductQuantity: (product:ProductType) => void;
    updateTotal: () => void;
}

export type SellerType = {
    name:string;
    email:string;
}

export type BestSellersType = {
    total:number;
    seller: SellerType[]
}

export type SellersChartType = SellerType & {
    __typename?:string;
    total:number;
}

export type BestClientsType = {
    total:number;
    client: ClientType[]
}

export type ClientsChartType = ClientType & {
    __typename?:string;
    total:number;
}