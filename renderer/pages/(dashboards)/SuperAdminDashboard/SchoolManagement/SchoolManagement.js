import React, { useState } from 'react';
import { FiPlus, FiSearch, FiBook, FiCalendar,FiAward,FiList,FiDatabase,FiUsers,FiUserPlus,
    FiTrendingUp,FiDollarSign, FiCheckSquare,FiFileText,FiMail,FiStar,
    FiCreditCard,FiTrendingDown,FiPieChart,FiUser,FiShield, FiLayout,FiPercent,FiSmile,FiTool, FiPackage, FiTruck,FiZap, FiFilter, FiEdit, FiTrash2, FiEye, FiDownload, FiUpload, FiSettings, FiAlertCircle } from 'react-icons/fi';
import Layout from '../../../../components/Layout';
import SchoolOverview from './components/SchoolOverview/SchoolOverview';
const SchoolManagement = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <SchoolOverview />;
      case 'details':
        return <SchoolDetails />;
      case 'academics':
        return <AcademicManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'students':
        return <StudentManagement />;
      case 'finances':
        return <FinancialManagement />;
      case 'facilities':
        return <FacilityManagement />;
      case 'performance':
        return <PerformanceMetrics />;
      default:
        return <SchoolOverview />;
    }
  };

  return (
    <Layout userRole="superadmin">
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">School Management</h2>
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveSection('overview')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Overview</button>
        <button onClick={() => setActiveSection('details')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">School Details</button>
        <button onClick={() => setActiveSection('academics')} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Academics</button>
        <button onClick={() => setActiveSection('staff')} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Staff</button>
        <button onClick={() => setActiveSection('students')} className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">Students</button>
        <button onClick={() => setActiveSection('finances')} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Finances</button>
        <button onClick={() => setActiveSection('facilities')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Facilities</button>
        <button onClick={() => setActiveSection('performance')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Performance</button>
      </div>
      {renderContent()}
    </div>
    </Layout>
  );
};


const SchoolDetails = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">School Details</h3>
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2">
        <input type="text" placeholder="Search schools..." className="px-4 py-2 border rounded" />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <FiSearch className="mr-2" /> Search
        </button>
      </div>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
        <FiPlus className="mr-2" /> Add New School
      </button>
    </div>
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">School Name</th>
          <th className="p-2 text-left">Location</th>
          <th className="p-2 text-left">Principal</th>
          <th className="p-2 text-left">Students</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <SchoolRow name="Springfield Elementary" location="Springfield" principal="Seymour Skinner" students="500" />
        <SchoolRow name="Hogwarts School" location="Scotland" principal="Albus Dumbledore" students="1000" />
        <SchoolRow name="Xavier's School for Gifted Youngsters" location="New York" principal="Charles Xavier" students="250" />
      </tbody>
    </table>
  </div>
);

const SchoolRow = ({ name, location, principal, students }) => (
  <tr className="border-b">
    <td className="p-2">{name}</td>
    <td className="p-2">{location}</td>
    <td className="p-2">{principal}</td>
    <td className="p-2">{students}</td>
    <td className="p-2">
      <button className="text-blue-500 hover:text-blue-700 mr-2"><FiEye /></button>
      <button className="text-green-500 hover:text-green-700 mr-2"><FiEdit /></button>
      <button className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
    </td>
  </tr>
);

const AcademicManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Academic Management</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActionCard title="Curriculum Management" icon={FiBook} action="Manage" />
      <ActionCard title="Exam Scheduling" icon={FiCalendar} action="Schedule" />
      <ActionCard title="Grading System" icon={FiAward} action="Configure" />
      <ActionCard title="Course Catalog" icon={FiList} action="View" />
      <ActionCard title="Academic Calendar" icon={FiCalendar} action="Set" />
      <ActionCard title="Learning Resources" icon={FiDatabase} action="Manage" />
    </div>
  </div>
);

const StaffManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Staff Management</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActionCard title="Teacher Directory" icon={FiUsers} action="View" />
      <ActionCard title="Staff Recruitment" icon={FiUserPlus} action="Manage" />
      <ActionCard title="Performance Evaluation" icon={FiTrendingUp} action="Evaluate" />
      <ActionCard title="Training Programs" icon={FiBook} action="Schedule" />
      <ActionCard title="Payroll Management" icon={FiDollarSign} action="Process" />
      <ActionCard title="Leave Management" icon={FiCalendar} action="Manage" />
    </div>
  </div>
);

const StudentManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Student Management</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActionCard title="Enrollment" icon={FiUserPlus} action="Manage" />
      <ActionCard title="Attendance Tracking" icon={FiCheckSquare} action="Track" />
      <ActionCard title="Academic Records" icon={FiFileText} action="View" />
      <ActionCard title="Behavior Management" icon={FiAlertCircle} action="Monitor" />
      <ActionCard title="Parent Communication" icon={FiMail} action="Manage" />
      <ActionCard title="Extracurricular Activities" icon={FiStar} action="Organize" />
    </div>
  </div>
);

const FinancialManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Financial Management</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActionCard title="Budget Planning" icon={FiDollarSign} action="Plan" />
      <ActionCard title="Fee Collection" icon={FiCreditCard} action="Manage" />
      <ActionCard title="Expense Tracking" icon={FiTrendingDown} action="Track" />
      <ActionCard title="Financial Reports" icon={FiPieChart} action="Generate" />
      <ActionCard title="Payroll Processing" icon={FiUser} action="Process" />
      <ActionCard title="Audit Management" icon={FiShield} action="Conduct" />
    </div>
  </div>
);

const FacilityManagement = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Facility Management</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActionCard title="Classroom Allocation" icon={FiLayout} action="Manage" />
      <ActionCard title="Maintenance Requests" icon={FiTool} action="Handle" />
      <ActionCard title="Inventory Management" icon={FiPackage} action="Track" />
      <ActionCard title="Safety Inspections" icon={FiShield} action="Schedule" />
      <ActionCard title="Transportation Management" icon={FiTruck} action="Organize" />
      <ActionCard title="Energy Consumption" icon={FiZap} action="Monitor" />
    </div>
  </div>
);

const PerformanceMetrics = () => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ActionCard title="Academic Performance" icon={FiTrendingUp} action="Analyze" />
      <ActionCard title="Teacher Effectiveness" icon={FiUsers} action="Evaluate" />
      <ActionCard title="Student Retention Rate" icon={FiPercent} action="View" />
      <ActionCard title="Graduation Rate" icon={FiAward} action="Track" />
      <ActionCard title="Parent Satisfaction" icon={FiSmile} action="Survey" />
      <ActionCard title="Resource Utilization" icon={FiPieChart} action="Optimize" />
    </div>
  </div>
);


const ActionCard = ({ title, icon: Icon, action }) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg font-semibold">{title}</h4>
      <Icon className="text-blue-500" size={24} />
    </div>
    <button className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {action}
    </button>
  </div>
);

export default SchoolManagement;