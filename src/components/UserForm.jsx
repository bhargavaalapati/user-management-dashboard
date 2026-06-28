import React, { useState, useEffect } from 'react';
import { validateUserForm } from '../utils/validators';
import { X } from 'lucide-react';

export default function UserForm({ isOpen, onClose, onSubmit, initialData }) {
    const defaultState = { firstName: '', lastName: '', email: '', department: '' };
    const [formData, setFormData] = useState(defaultState);
    const [errors, setErrors] = useState({});

    // Pre-populate form if we are editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultState);
        }
        setErrors({});
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for the field being typed in
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateUserForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? 'Edit User' : 'Add New User'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`mt-1 block w-full rounded-md border p-2 focus:ring-blue-500 outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`mt-1 block w-full rounded-md border p-2 focus:ring-blue-500 outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full rounded-md border p-2 focus:ring-blue-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} className={`mt-1 block w-full rounded-md border p-2 focus:ring-blue-500 outline-none ${errors.department ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
                    </div>

                    <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                            {initialData ? 'Save Changes' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}