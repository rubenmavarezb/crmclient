import React, { useEffect } from 'react';
///////////////////////////////////////////////
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
///////////////////////////////////////////////
import { BEST_SELLERS } from '../graphql';
import { BestSellersType, SellersChartType } from '../interfaces';
///////////////////////////////////////////////
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
///////////////////////////////////////////////
 
const BestSellers = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS);

    const bestSellers: BestSellersType[] = data?.bestSellers;

    const sellersChart: SellersChartType[] = [];

    !loading && bestSellers && bestSellers.map((seller, i:number) => {
        sellersChart[i] = {
            ...seller.seller[0],
            total: seller.total
        }
    });

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>

            {loading && <Spinner/>}
            {!loading && (
                <ResponsiveContainer
                    width={'99%'}
                    height={550}
                >
                    <BarChart
                        className="mt-10"
                        width={600}
                        height={500}
                        data={sellersChart}
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
                </ResponsiveContainer>
            )}
        </Layout>
     );
}
 
export default BestSellers;