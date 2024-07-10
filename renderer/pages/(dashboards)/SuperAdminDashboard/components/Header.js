import React from 'react';
import { FiBell, FiMessageSquare, FiLogOut } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <FiBell className="w-6 h-6" />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FiMessageSquare className="w-6 h-6" />
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-800">
          <FiLogOut className="w-6 h-6 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;