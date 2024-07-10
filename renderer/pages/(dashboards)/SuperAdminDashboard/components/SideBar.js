import React from 'react';
import { FiHome, FiSchool, FiUsers, FiBook, FiDollarSign, FiFileText, FiSettings } from 'react-icons/fi';
import Link from 'next/link';




const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: FiHome, label: 'Overview', value: 'overview' },
    { icon: FiSchool, label: 'Schools', value: 'schools' },
    { icon: FiUsers, label: 'Users', value: 'users' },
    { icon: FiBook, label: 'Academic', value: 'academic' },
    { icon: FiDollarSign, label: 'Financial', value: 'financial' },
    { icon: FiFileText, label: 'Reporting', value: 'reporting' },
    { icon: FiSettings, label: 'Settings', value: 'settings' },
  ];

  return (
    <div className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h1 className="text-2xl font-semibold text-center">ASOFT Super Admin</h1>
      <nav>
        {menuItems.map((item) => (
          <Link
          
            key={item.value}
            href="#"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              activeTab === item.value ? 'bg-indigo-900' : 'hover:bg-indigo-700'
            }`}
            onClick={() => setActiveTab(item.value)}
          >
            {React.createElement(item.icon, { className: "inline-block mr-2" })}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;