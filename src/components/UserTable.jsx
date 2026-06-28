import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function UserTable({ users, onSort, sortConfig, onEdit, onDelete }) {
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return ' ↕';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-6">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        {['firstName', 'lastName', 'email', 'department'].map(key => (
                            <th
                                key={key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => onSort(key)}
                            >
                                {key.replace(/([A-Z])/g, ' $1').trim()} {getSortIcon(key)}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.length > 0 ? users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {user.department}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                <button onClick={() => onEdit(user)} className="text-indigo-600 hover:text-indigo-900"><Edit2 size={18} /></button>
                                <button onClick={() => onDelete(user)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No users found matching your criteria.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}