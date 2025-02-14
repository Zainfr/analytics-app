import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import React from 'react'

const Chart = ({ data }) => {
    //Task 2:
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/api/energy');
    //             if (!response.data) {
    //                 throw new Error('Error Fetching Data');
    //             }
    //             const data = response.data;
    //             const formattedData = data.map((data) => ({
    //                 date: new Date(data.createdAt).toLocaleDateString(),
    //                 energy: data.total_kwh
    //             }));

    //             setChartData(formattedData);
    //         } catch (error) {
    //             console.error("Error Fetching data : ", error);
    //         }
    //     }

    //     fetchData();
    // }, []);

    //Loader
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }
    }, [data])


    console.log(data);

    return (
        <div className='chart-container'>
            <h2>Energy Consumed</h2>
            {isLoading ? (<div className="loader-container">
                <div className="loader"></div>
                <span>Loading...</span>
            </div>) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey='date' stroke='#5550bd'>
                            <Label value="Date" offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis dataKey='energy' stroke='#5550bd' label={{ value: 'Energy Consumed (kWh)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />

                        <Bar dataKey='energy' fill='#8884d8' />
                    </BarChart>
                </ResponsiveContainer>)
            }
        </div>
    )
}

export default Chart