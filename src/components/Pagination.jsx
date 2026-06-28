import React from 'react';

export default function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage, setItemsPerPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>Rows per page:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 p-1 cursor-pointer"
                >
                    {[10, 25, 50, 100].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-2 mt-4 sm:mt-0">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">Page {currentPage} of {totalPages || 1}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}