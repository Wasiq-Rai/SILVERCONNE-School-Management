import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const AlertsModal = ({ onClose }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulating fetching alerts from an API
    const fetchAlerts = async () => {
      // Replace this with actual API call
      const response = await fetch('/api/alerts');
      const data = await response.json();
      setAlerts(data);
    };

    fetchAlerts();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">System Alerts</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {alerts.length === 0 ? (
            <p>No alerts at this time.</p>
          ) : (
            alerts.map((alert, index) => (
              <div key={index} className={`p-3 mb-2 rounded ${alert.type === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm">{alert.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsModal;