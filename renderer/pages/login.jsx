import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock user data - replace with actual API call
    const userData = {
      superadmin: { name: 'Super Admin', role: 'SuperAdmin' },
      schooladmin: { name: 'School Admin', role: 'Schooladmin' },
      adminuser: { name: 'Admin User', role: 'AdminUser' },
      student: { name: 'John Doe', role: 'Student', grade: '10' },
      teacher: { name: 'Mrs. Smith', role: 'Teachers', department: 'Science' }
    };

    const user = userData[role];
    // if (user && password === 'password') {
      setUserInfo(user);
      setTimeout(() => {
        router.push(`/(dashboards)/SuperAdminDashboard/SuperAdminDashboard`);
        // router.push(`/(dashboards)/${user.role}Dashboard/${user.role}Dashboard`);
      }, 1000);
    // } else {
    //   alert('Invalid credentials');
    // }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="about-img text-center lg:text-right" data-wow-delay=".2s">

<Image unoptimized  quality={100}width={0} height={0} src={'/images/silverconne.png'} alt="" className="w-4/5 h-auto rounded-lg shadow-lg" />
{/* <h2 className="select-none mb-4 z-10 text-2xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">
          {" "}
          
          ADVANCED SCHOOL OPERATIONS 
          <span className="text-blue-600 dark:text-blue-500">
            Stocks
          </span>
          <br /> FACILITATOR TOOL
        </h2> */}
</div>

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
      
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Role</option>
            <option value="superadmin">Super Admin</option>
            <option value="schooladmin">School Admin</option>
            <option value="adminuser">Admin User</option>
            <option value="student">Student/Parent</option>
            <option value="teacher">Head of Department/Class Teacher</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {loading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded" style={{width: '45%'}}>45%</div>
            </div>
          </div>
        )}
        {userInfo && (
          <div className="mt-4">
            <h3 className="font-bold">User Information:</h3>
            <p>Name: {userInfo.name}</p>
            <p>Role: {userInfo.role}</p>
            {userInfo.grade && <p>Grade: {userInfo.grade}</p>}
            {userInfo.department && <p>Department: {userInfo.department}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;