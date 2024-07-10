import React from 'react';
import { FiUsers, FiBook, FiDollarSign, FiActivity } from 'react-icons/fi';

const Overview = () => {
  const stats = [
    { icon: FiUsers, label: 'Total Schools', value: '500' },
    { icon: FiUsers, label: 'Total Students', value: '50,000' },
    { icon: FiUsers, label: 'Total Staff', value: '5,000' },
    { icon: FiBook, label: 'Active Courses', value: '1,000' },
    { icon: FiDollarSign, label: 'Total Revenue', value: '$10M' },
    { icon: FiActivity, label: 'System Uptime', value: '99.9%' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>
      <RecentActivity />
      <SystemAlerts />
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <Icon className="text-4xl text-indigo-600 mr-4" />
    <div>
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
    <ul className="space-y-4">
      <li className="flex items-center justify-between">
        <span>New school registered: Sunrise Academy</span>
        <span className="text-sm text-gray-500">2 hours ago</span>
      </li>
      <li className="flex items-center justify-between">
        <span>System update completed</span>
        <span className="text-sm text-gray-500">1 day ago</span>
      </li>
      <li className="flex items-center justify-between">
        <span>New feature rolled out: Advanced Reporting</span>
        <span className="text-sm text-gray-500">3 days ago</span>
      </li>
    </ul>
  </div>
);

const SystemAlerts = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4">System Alerts</h3>
    <ul className="space-y-4">
      <li className="flex items-center text-yellow-600">
        <FiActivity className="mr-2" />
        <span>High server load detected</span>
      </li>
      <li className="flex items-center text-green-600">
        <FiActivity className="mr-2" />
        <span>All systems operating normally</span>
      </li>
    </ul>
  </div>
);

export default Overview;