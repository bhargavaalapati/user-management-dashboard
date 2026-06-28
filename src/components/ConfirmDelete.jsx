import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDelete({ isOpen, onClose, onConfirm, userName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete User</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-3">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
    );
}