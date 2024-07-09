import React from 'react';
import { useRouter } from 'next/router';
import { useUserRole } from '../hooks/useUserRole';

const Dashboard = () => {
  const router = useRouter();
  const { role } = useUserRole(); // Custom hook to get user role

  const navigation = {
    superAdmin: [
      { name: 'Student Management and Enrollment', href: '/student-management' },
      { name: 'Finance Tracking and Payroll Processing', href: '/finance-tracking' },
      // ...other links
    ],
    schoolAdmin: [
      { name: 'Student Management and Enrollment', href: '/student-management' },
      // ...other links for school admin
    ],
    // ...other roles
  };

  const userNavigation = navigation[role] || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Welcome to ASOFT</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userNavigation.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className="p-4 bg-white shadow-md rounded-lg text-center hover:bg-gray-200 transition"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
