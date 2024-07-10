import React from 'react';
import Layout from '../../components/Layout';

const StudentDashboard = () => {
  return (
    <Layout userRole="student">
      <h1 className="text-2xl text-gray-200 font-bold mb-4">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Personal Information</h2>
          {/* Add personal information components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Academic Records</h2>
          {/* Add academic record components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Fee Status</h2>
          {/* Add fee status components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Timetable</h2>
          {/* Add timetable components */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Library</h2>
          {/* Add library components for students */}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;