import React, { useState, useEffect } from 'react';
import { FiPlus, FiDownload, FiAlertCircle, FiRefreshCw, FiFilter, FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { CSVLink } from "react-csv";
import AddSchoolModal from './components/AddSchoolModal';
import AlertsModal from './components/AlertsModal';
import ConfirmDialog from './components/ConfirmDialogue';
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
    facilitiesUtilization: 0
  });
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const fetchSchoolData = async () => {
    setIsLoading(true);
    try {
      const data = await electron.ipcRenderer.invoke('fetch-schools');
      setSchools(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch school data');
      setIsLoading(false);
    }
  };

  const handleAddSchool = async (newSchool) => {
    try {
      const addedSchool = await electron.ipcRenderer.invoke('add-school', newSchool);
      setSchools([...schools, addedSchool]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add new school');
    }
  };

  const handleEditSchool = async (updatedSchool) => {
    try {
      const editedSchool = await electron.ipcRenderer.invoke('update-school', updatedSchool);
      setSchools(schools.map(school => 
        school.id === editedSchool.id ? editedSchool : school
      ));
    } catch (err) {
      setError('Failed to update school');
    }
  };

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return;
    try {
      await electron.ipcRenderer.invoke('delete-school', schoolToDelete.id);
      setSchools(schools.filter(school => school.id !== schoolToDelete.id));
      setShowConfirmDialog(false);
      setSchoolToDelete(null);
    } catch (err) {
      setError('Failed to delete school');
    }
  };

  const generateCSV = () => {
    const csvData = [
      ["School Name", "Type", "Students", "Staff", "Performance"],
      ...filteredSchools.map(school => [
        school.name,
        school.type,
        school.students,
        school.staff,
        school.performance
      ])
    ];
    return csvData;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">School Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Schools" value={stats.totalSchools} />
        <StatCard title="Active Students" value={stats.activeStudents} />
        <StatCard title="Total Staff" value={stats.totalStaff} />
        <StatCard title="Average Performance" value={`${stats.averagePerformance}%`} />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} />
        <StatCard title="Facilities Utilization" value={`${stats.facilitiesUtilization}%`} />
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Quick Actions</h4>
        <div className="flex space-x-2">
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
              <td className="p-2">
                <button onClick={() => {/* Implement view details */}} className="text-blue-500 hover:text-blue-700 mr-2"><FiEye /></button>
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
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

export default SchoolOverview;