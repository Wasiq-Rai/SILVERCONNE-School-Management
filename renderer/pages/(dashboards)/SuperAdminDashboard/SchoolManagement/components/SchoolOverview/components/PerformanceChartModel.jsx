import React from 'react';
import { FiX } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';

const PerformanceChartModal = ({ schools, onClose }) => {
  const chartData = {
    labels: schools.map(school => school.name),
    datasets: [
      {
        label: 'Performance',
        data: schools.map(school => school.performance),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">School Performance Overview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceChartModal;