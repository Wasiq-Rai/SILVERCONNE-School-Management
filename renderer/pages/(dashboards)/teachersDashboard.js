import React from 'react';
import Layout from '../../components/Layout';

const TeacherDashboard = () => {
  return (
    <Layout userRole="teacher">
      <h1 className="text-2xl text-gray-200 font-bold mb-4">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Class Management</h2>
          {/* Add class management components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Student Performance</h2>
          {/* Add student performance tracking components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Attendance Tracking</h2>
          {/* Add attendance tracking components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Curriculum Planning</h2>
          {/* Add curriculum planning components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Reports Generation</h2>
          {/* Add report generation components for teachers */}
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;