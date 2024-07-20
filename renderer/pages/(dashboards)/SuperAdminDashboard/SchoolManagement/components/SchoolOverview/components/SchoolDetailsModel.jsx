import React from 'react';
import { FiX } from 'react-icons/fi';

const SchoolDetailsModal = ({ school, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{school.name} Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>Type:</strong> {school.type}</p>
          <p><strong>Location:</strong> {school.location}</p>
          <p><strong>Established:</strong> {school.established}</p>
          <p><strong>Principal:</strong> {school.principal}</p>
          <p><strong>Students:</strong> {school.students}</p>
          <p><strong>Staff:</strong> {school.staff}</p>
          <p><strong>Performance:</strong> {school.performance}%</p>
          <p><strong>Budget:</strong> ${school.budget}</p>
          <p><strong>Revenue:</strong> ${school.revenue}</p>
          <p><strong>Facilities Utilization:</strong> {school.facilitiesUtilization}%</p>
          <p><strong>Average Teacher Salary:</strong> ${school.averageTeacherSalary}</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailsModal;