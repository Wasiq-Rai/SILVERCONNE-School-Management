import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLogOut, FiHome, FiUsers, FiSettings, FiMessageSquare, FiFileText, FiDollarSign, FiBook, FiCalendar, FiBarChart2, FiArchive, FiClipboard, FiShoppingCart } from 'react-icons/fi';

const Layout = ({ children, userRole }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    router.push('/login');
  };

  const sidebarItems = {
    superadmin: [
      { href: '/superadmindashboard', label: 'Dashboard', icon: FiHome },
      { href: '../SuperAdminDashboard/SchoolManagement/SchoolManagement', label: 'School Management', icon: FiArchive },
      { href: '/superadmin/packages', label: 'Package Management', icon: FiShoppingCart },
      { href: '/superadmin/users', label: 'User Management', icon: FiUsers },
      { href: '/superadmin/finance', label: 'Financial Overview', icon: FiDollarSign },
      { href: '/superadmin/academic', label: 'Academic Management', icon: FiBook },
      { href: '/superadmin/settings', label: 'System Settings', icon: FiSettings },
      { href: '/superadmin/messages', label: 'Message Center', icon: FiMessageSquare },
      { href: '/superadmin/reports', label: 'Analytics & Reports', icon: FiBarChart2 },
      { href: '/superadmin/audit', label: 'Audit Logs', icon: FiClipboard },
    ],
    schooladmin: [
      { href: '/schooladmindashboard', label: 'Dashboard', icon: FiHome },
      { href: '/schooladmin/students', label: 'Student Management', icon: FiUsers },
      { href: '/schooladmin/staff', label: 'Staff Management', icon: FiUsers },
      { href: '/schooladmin/finance', label: 'Financial Management', icon: FiDollarSign },
      { href: '/schooladmin/classes', label: 'Class Management', icon: FiBook },
      { href: '/schooladmin/curriculum', label: 'Curriculum Planning', icon: FiCalendar },
      { href: '/schooladmin/reports', label: 'Reports & Analytics', icon: FiBarChart2 },
      { href: '/schooladmin/facilities', label: 'Facility Management', icon: FiArchive },
      { href: '/schooladmin/communications', label: 'Communications', icon: FiMessageSquare },
      { href: '/schooladmin/settings', label: 'School Settings', icon: FiSettings },
    ],
    adminuser: [
      { href: '/adminuserdashboard', label: 'Dashboard', icon: FiHome },
      { href: '/adminuser/students', label: 'Student Records', icon: FiUsers },
      { href: '/adminuser/fees', label: 'Fee Management', icon: FiDollarSign },
      { href: '/adminuser/library', label: 'Library Management', icon: FiBook },
      { href: '/adminuser/property', label: 'Property Management', icon: FiArchive },
      { href: '/adminuser/reports', label: 'Reports Generation', icon: FiFileText },
      { href: '/adminuser/attendance', label: 'Attendance Tracking', icon: FiCalendar },
      { href: '/adminuser/exams', label: 'Exam Management', icon: FiClipboard },
    ],
    student: [
      { href: '/studentdashboard', label: 'Dashboard', icon: FiHome },
      { href: '/student/profile', label: 'Personal Information', icon: FiUsers },
      { href: '/student/academics', label: 'Academic Records', icon: FiBook },
      { href: '/student/fees', label: 'Fee Status', icon: FiDollarSign },
      { href: '/student/timetable', label: 'Timetable', icon: FiCalendar },
      { href: '/student/library', label: 'Library', icon: FiBook },
      { href: '/student/assignments', label: 'Assignments', icon: FiClipboard },
      { href: '/student/messages', label: 'Messages', icon: FiMessageSquare },
    ],
    teacher: [
      { href: '/teacherdashboard', label: 'Dashboard', icon: FiHome },
      { href: '/teacher/classes', label: 'Class Management', icon: FiUsers },
      { href: '/teacher/performance', label: 'Student Performance', icon: FiBarChart2 },
      { href: '/teacher/attendance', label: 'Attendance Tracking', icon: FiCalendar },
      { href: '/teacher/curriculum', label: 'Curriculum Planning', icon: FiBook },
      { href: '/teacher/reports', label: 'Reports Generation', icon: FiFileText },
      { href: '/teacher/assignments', label: 'Assignments', icon: FiClipboard },
      { href: '/teacher/resources', label: 'Teaching Resources', icon: FiArchive },
      { href: '/teacher/communications', label: 'Parent Communications', icon: FiMessageSquare },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">ASOFT</h2>
        <nav>
          {sidebarItems[userRole].map((item) => (
            <Link key={item.href} href={item.href}
             className="flex items-center py-2 px-4 text-white hover:bg-indigo-600 rounded mb-2">
                {React.createElement(item.icon, { className: "mr-3" })}
                {item.label}
              
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center text-white hover:bg-indigo-600 py-2 px-4 rounded w-full"
        >
          <FiLogOut className="mr-3" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;