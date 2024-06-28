import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { SalesChartProps } from './SalesChart.types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ salesData, productNames }: SalesChartProps) => {
    const data = {
        labels: productNames,
        datasets: [
            {
                label: 'Quantity Sold',
                data: salesData,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Quantity Sold per Product',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Product Name',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Quantity Sold',
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SalesChart;
