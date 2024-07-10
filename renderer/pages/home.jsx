import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <React.Fragment>
      <Head>
        <title>ASOFT - Dashboard</title>
      </Head>
      <Layout>
        <h1 className="text-3xl text-white font-bold mb-5">Welcome, {user.username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Total Students</h2>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Total Staff</h2>
            <p className="text-3xl font-bold">56</p>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Total Classes</h2>
            <p className="text-3xl font-bold">24</p>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default Home;