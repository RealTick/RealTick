import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ data }) {
    console.log("Chart data:", data);

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Closing Price',
                data: Object.values(data),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
    );
}


export default LineChart;
