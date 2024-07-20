import React, { useState, useEffect } from 'react';
import { FiPlus, FiDownload, FiAlertCircle, FiRefreshCw, FiFilter, FiSearch, FiEdit, FiTrash2, FiEye, FiBarChart2, FiUsers, FiDollarSign, FiMapPin, FiCalendar } from 'react-icons/fi';
import { CSVLink } from "react-csv";
import AddSchoolModal from './components/AddSchoolModal';
import AlertsModal from './components/AlertsModal';
import ConfirmDialog from './components/ConfirmDialogue';
import SchoolDetailsModal from './components/SchoolDetailsModel';
import PerformanceChartModal from './components/PerformanceChartModel';
import BudgetAllocationModal from './components/BudgetAllocationModal';

let electron;

if (!process.browser) {
  electron = require('electron');
}

const SchoolOverview = () => {
  const [stats, setStats] = useState({
    totalSchools: 0,
    activeStudents: 0,
    totalStaff: 0,
    averagePerformance: 0,
    totalRevenue: 0,
    facilitiesUtilization: 0,
    totalBudget: 0,
    averageTeacherSalary: 0,
    studentTeacherRatio: 0
  });
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSchoolDetailsModal, setShowSchoolDetailsModal] = useState(false);
  const [showPerformanceChartModal, setShowPerformanceChartModal] = useState(false);
  const [showBudgetAllocationModal, setShowBudgetAllocationModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  useEffect(() => {
    fetchSchoolData();
  }, []);

  useEffect(() => {
    filterSchools();
  }, [schools, searchTerm, filterCriteria]);

  const fetchSchoolData = async () => {
    setIsLoading(true);
    try {
      console.log('Renderer: Sending fetch-schools request');
      const data = await window.ipc.invoke('fetch-schools');
      console.log('Renderer: Received schools data:', data);
      setSchools(data);
      updateStats(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Renderer: Error fetching school data:', err);
      setError('Failed to fetch school data: ' + err.message);
      setIsLoading(false);
    }
  };

  const updateStats = (schoolsData) => {
    const totalSchools = schoolsData.length;
    const activeStudents = schoolsData.reduce((sum, school) => sum + school.students, 0);
    const totalStaff = schoolsData.reduce((sum, school) => sum + school.staff, 0);
    const averagePerformance = schoolsData.reduce((sum, school) => sum + school.performance, 0) / totalSchools;
    const totalRevenue = schoolsData.reduce((sum, school) => sum + school.revenue, 0);
    const facilitiesUtilization = schoolsData.reduce((sum, school) => sum + school.facilitiesUtilization, 0) / totalSchools;
    const totalBudget = schoolsData.reduce((sum, school) => sum + school.budget, 0);
    const averageTeacherSalary = schoolsData.reduce((sum, school) => sum + school.averageTeacherSalary, 0) / totalSchools;
    const studentTeacherRatio = activeStudents / totalStaff;

    setStats({
      totalSchools,
      activeStudents,
      totalStaff,
      averagePerformance: averagePerformance.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      facilitiesUtilization: facilitiesUtilization.toFixed(2),
      totalBudget: totalBudget.toFixed(2),
      averageTeacherSalary: averageTeacherSalary.toFixed(2),
      studentTeacherRatio: studentTeacherRatio.toFixed(2)
    });
  };

  const filterSchools = () => {
    let filtered = schools;
    if (searchTerm) {
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCriteria !== 'all') {
      filtered = filtered.filter(school => school.type === filterCriteria);
    }
    setFilteredSchools(filtered);
  };

  const handleAddSchool = async (newSchool) => {
    try {
      console.log('Renderer: Sending add-school request');
      const addedSchool = await window.ipc.invoke('add-school', newSchool);
      console.log('Renderer: Received added school data:', addedSchool);
      setSchools([...schools, addedSchool]);
      updateStats([...schools, addedSchool]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Renderer: Error adding new school:', err);
      setError('Failed to add new school: ' + err.message);
    }
  };

  const handleEditSchool = async (updatedSchool) => {
    try {
      console.log('Renderer: Sending update-school request');
      const editedSchool = await window.ipc.invoke('update-school', updatedSchool);
      console.log('Renderer: Received updated school data:', editedSchool);
      const updatedSchools = schools.map(school => 
        school.id === editedSchool.id ? editedSchool : school
      );
      setSchools(updatedSchools);
      updateStats(updatedSchools);
    } catch (err) {
      console.error('Renderer: Error updating school:', err);
      setError('Failed to update school: ' + err.message);
    }
  };

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return;
    try {
      console.log('Renderer: Sending delete-school request');
      await window.ipc.invoke('delete-school', schoolToDelete.id);
      console.log('Renderer: School deleted successfully');
      const updatedSchools = schools.filter(school => school.id !== schoolToDelete.id);
      setSchools(updatedSchools);
      updateStats(updatedSchools);
      setShowConfirmDialog(false);
      setSchoolToDelete(null);
    } catch (err) {
      console.error('Renderer: Error deleting school:', err);
      setError('Failed to delete school: ' + err.message);
    }
  };

  const handleAllocateBudget = async (schoolId, amount) => {
    try {
      console.log('Renderer: Sending allocate-budget request');
      const updatedSchool = await window.ipc.invoke('allocate-budget', { schoolId, amount });
      console.log('Renderer: Received updated school data:', updatedSchool);
      const updatedSchools = schools.map(school => 
        school.id === updatedSchool.id ? updatedSchool : school
      );
      setSchools(updatedSchools);
      updateStats(updatedSchools);
      setShowBudgetAllocationModal(false);
    } catch (err) {
      console.error('Renderer: Error allocating budget:', err);
      setError('Failed to allocate budget: ' + err.message);
    }
  };

  const generateCSV = () => {
    const csvData = [
      ["School Name", "Type", "Students", "Staff", "Performance", "Revenue", "Budget", "Location", "Established", "Principal"],
      ...filteredSchools.map(school => [
        school.name,
        school.type,
        school.students,
        school.staff,
        school.performance,
        school.revenue,
        school.budget,
        school.location,
        school.established,
        school.principal
      ])
    ];
    return csvData;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">School Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Schools" value={stats.totalSchools} icon={<FiMapPin />} />
        <StatCard title="Active Students" value={stats.activeStudents} icon={<FiUsers />} />
        <StatCard title="Total Staff" value={stats.totalStaff} icon={<FiUsers />} />
        <StatCard title="Average Performance" value={`${stats.averagePerformance}%`} icon={<FiBarChart2 />} />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon={<FiDollarSign />} />
        <StatCard title="Facilities Utilization" value={`${stats.facilitiesUtilization}%`} icon={<FiBarChart2 />} />
        <StatCard title="Total Budget" value={`$${stats.totalBudget}`} icon={<FiDollarSign />} />
        <StatCard title="Avg Teacher Salary" value={`$${stats.averageTeacherSalary}`} icon={<FiDollarSign />} />
        <StatCard title="Student-Teacher Ratio" value={stats.studentTeacherRatio} icon={<FiUsers />} />
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Super Admin Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
            <FiPlus className="mr-2" /> Add New School
          </button>
          <CSVLink data={generateCSV()} filename={"schools_report.csv"}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
              <FiDownload className="mr-2" /> Generate Report
            </button>
          </CSVLink>
          <button onClick={() => setShowAlertsModal(true)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center">
            <FiAlertCircle className="mr-2" /> View Alerts
          </button>
          <button onClick={fetchSchoolData} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center">
            <FiRefreshCw className="mr-2" /> Refresh Data
          </button>
          <button onClick={() => setShowPerformanceChartModal(true)} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 flex items-center">
            <FiBarChart2 className="mr-2" /> Performance Overview
          </button>
          <button onClick={() => setShowBudgetAllocationModal(true)} className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 flex items-center">
            <FiDollarSign className="mr-2" /> Allocate Budget
          </button>
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <select
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Types</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="charter">Charter</option>
          </select>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">School Name</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Students</th>
            <th className="p-2 text-left">Staff</th>
            <th className="p-2 text-left">Performance</th>
            <th className="p-2 text-left">Budget</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchools.map(school => (
            <tr key={school.id} className="border-b">
              <td className="p-2">{school.name}</td>
              <td className="p-2">{school.type}</td>
              <td className="p-2">{school.students}</td>
              <td className="p-2">{school.staff}</td>
              <td className="p-2">{school.performance}%</td>
              <td className="p-2">${school.budget}</td>
              <td className="p-2">{school.location}</td>
              <td className="p-2">
                <button onClick={() => {setSelectedSchool(school); setShowSchoolDetailsModal(true);}} className="text-blue-500 hover:text-blue-700 mr-2"><FiEye /></button>
                <button onClick={() => handleEditSchool(school)} className="text-green-500 hover:text-green-700 mr-2"><FiEdit /></button>
                <button onClick={() => {setSchoolToDelete(school); setShowConfirmDialog(true);}} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddModal && <AddSchoolModal onClose={() => setShowAddModal(false)} onAdd={handleAddSchool} />}
      {showAlertsModal && <AlertsModal onClose={() => setShowAlertsModal(false)} />}
      {showConfirmDialog && (
        <ConfirmDialog
          message={`Are you sure you want to delete ${schoolToDelete?.name}?`}
          onConfirm={handleDeleteSchool}
          onCancel={() => {setShowConfirmDialog(false); setSchoolToDelete(null);}}
        />
      )}
      {showSchoolDetailsModal && (
        <SchoolDetailsModal
          school={selectedSchool}
          onClose={() => setShowSchoolDetailsModal(false)}
        />
      )}
      {showPerformanceChartModal && (
        <PerformanceChartModal
          schools={schools}
          onClose={() => setShowPerformanceChartModal(false)}
        />
      )}
      {showBudgetAllocationModal && (
        <BudgetAllocationModal
          schools={schools}
          onAllocate={handleAllocateBudget}
          onClose={() => setShowBudgetAllocationModal(false)}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded shadow">
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="text-lg font-semibold ml-2">{title}</h4>
    </div>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

export default SchoolOverview;