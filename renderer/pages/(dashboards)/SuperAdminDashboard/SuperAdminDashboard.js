import React, { useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import Sidebar from './components/SideBar';
import Layout from '../../../components/Layout';
// import SchoolManagement from './SchoolManagement';
// import UserManagement from './UserManagement';
// import AcademicManagement from './AcademicManagement';
// import FinancialManagement from './FinancialManagement';
// import Reporting from './Reporting';
// import SystemSettings from './SystemSettings';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      // case 'schools':
      //   return <SchoolManagement />;
      // case 'users':
      //   return <UserManagement />;
      // case 'academic':
      //   return <AcademicManagement />;
      // case 'financial':
      //   return <FinancialManagement />;
      // case 'reporting':
      //   return <Reporting />;
      // case 'settings':
      //   return <SystemSettings />;
      default:
        return <Overview />;
    }
  };

  return (
    <Layout userRole="superadmin">

    <div className="flex h-screen">
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
    </Layout>
  );
};

export default SuperAdminDashboard;