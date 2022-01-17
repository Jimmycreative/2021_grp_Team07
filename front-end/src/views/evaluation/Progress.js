import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July', 'July'];

const data = {
    labels: labels,
    datasets: [{
      label: 'Progress for 10 recent schedules',
      backgroundColor: '#33CCCC',
      borderColor: 'rgb(255, 99, 132)',
      data: [0.5, 0.6, 0.57, 0.2, 0.02, 0.33, 0.45, 0.1, 1, 0.99],
    }]
  };

function Progress() {
    return (
        <>
        <div className="my-progress">
            <Bar options={options} data={data} />
        </div>
        
        </>
    )
}

export default Progress;