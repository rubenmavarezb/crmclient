import React, { useEffect } from 'react';
///////////////////////////////////////////////
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useQuery } from '@apollo/client';
///////////////////////////////////////////////
import { BEST_CLIENTS } from '../graphql';
import { BestClientsType, ClientsChartType } from '../interfaces';
///////////////////////////////////////////////
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
///////////////////////////////////////////////
 
const BestClients = () => {

    const { data, loading, startPolling, stopPolling } = useQuery(BEST_CLIENTS, {
        pollInterval:1000
    });

    const bestClients: BestClientsType[] = data?.bestClients;

    const clientsChart: ClientsChartType[] = [];

    !loading && bestClients && bestClients.map((client, i:number) => {
        clientsChart[i] = {
            ...client.client[0],
            total: client.total
        }
    });

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Best Clients</h1>

            {loading && <Spinner/>}
            {!loading && (
                <BarChart
                    className="mt-10"
                    width={600}
                    height={500}
                    data={clientsChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182ce" />
                </BarChart>
            )}
        </Layout>
     );
}
 
export default BestClients;