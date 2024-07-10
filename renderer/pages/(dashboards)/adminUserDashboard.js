import React from 'react';
import Layout from '../../components/Layout';

const AdminUserDashboard = () => {
  return (
    <Layout userRole="adminuser">
      <h1 className="text-2xl text-gray-200 font-bold mb-4">Admin User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Student Records</h2>
          {/* Add student record components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Fee Management</h2>
          {/* Add fee management components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Library Management</h2>
          {/* Add library management components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Property Management</h2>
          {/* Add property management components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Reports Generation</h2>
          {/* Add report generation components */}
        </div>
      </div>
    </Layout>
  );
};

export default AdminUserDashboard;