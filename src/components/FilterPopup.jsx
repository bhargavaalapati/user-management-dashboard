import React from 'react';
import { X, Filter } from 'lucide-react';

export default function FilterPopup({ isOpen, onClose, filters, setFilters, departments }) {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ firstName: '', lastName: '', email: '', department: '' });
    };

    return (
        <div className="absolute top-12 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-40 p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Filter size={16} /> Filter Users
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">First Name</label>
                    <input type="text" name="firstName" value={filters.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. Leanne" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Last Name</label>
                    <input type="text" name="lastName" value={filters.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. Graham" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                    <input type="text" name="email" value={filters.email} onChange={handleChange} className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. @biz" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                    <select name="department" value={filters.department} onChange={handleChange} className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer">
                        <option value="">All Departments</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-red-600 font-medium">Clear</button>
                <button onClick={onClose} className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 font-medium">Apply</button>
            </div>
        </div>
    );
}