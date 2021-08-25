import React, { useEffect, useState, useContext } from 'react';
//////////////////////////////////////////
import Select from 'react-select';
import { useQuery } from '@apollo/client';
//////////////////////////////////////////
import OrderContext from '../../context/orders/orderContext';
//////////////////////////////////////////
import { GET_CLIENTS_FROM_USER } from '../../graphql';
import { ClientType, OrderContextType } from '../../interfaces';
//////////////////////////////////////////
import Spinner from '../Spinner';
//////////////////////////////////////////

const AssignClient = () => {

    const orderContext: OrderContextType = useContext(OrderContext);
    const { addClient } = orderContext;

    const [client, setClient] = useState<ClientType>({
        id:'',
        name: '',
        lastname:'',
        company:'',
        email: '',
        seller: '',
        phone: '',
    });

    const { data, loading, error } = useQuery(GET_CLIENTS_FROM_USER);

    const selectClient = (clientname:any) => {
        setClient(clientname)
    }

    useEffect(() => {
        if(!Object.values(client).includes('')) {
            addClient(client)
        }
    }, [client]);

    if(loading) return <Spinner/>

    const getClientsSeller: ClientType[] = data?.getClientsSeller;

    return (
        <>
            <p
                className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"
            >1.- Assign a Client to this order</p>
            <Select
                className="mt-3"
                options={ getClientsSeller }
                onChange={ (option) => selectClient(option) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => options.name }
                placeholder="Select your client"
                noOptionsMessage={() => "No client found"}
            />
        </>
     );
}
 
export default AssignClient;