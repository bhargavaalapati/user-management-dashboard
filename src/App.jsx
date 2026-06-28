import React, { useState, useMemo } from 'react';
import { useUsers } from './hooks/useUsers';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import { Search, UserPlus } from 'lucide-react';

export default function App() {
  const { users, loading, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Handle Sort Toggle
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // Memoized Search, Sort, and Pagination math
  const processedUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sorted = filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return {
      paginated: sorted.slice(startIndex, startIndex + itemsPerPage),
      total: sorted.length
    };
  }, [users, searchQuery, sortConfig, currentPage, itemsPerPage]);

  if (loading) return <div className="flex h-screen items-center justify-center text-blue-600 font-bold text-xl">Loading users...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-600 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">User Management Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors">
            <UserPlus size={20} /> <span>Add User</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          {/* We will build the dedicated FilterPopup in Phase 2 if needed, but search acts as primary cohort targeting for now */}
        </div>

        {/* Data Grid & Pagination */}
        <UserTable users={processedUsers.paginated} onSort={handleSort} sortConfig={sortConfig} />
        <Pagination
          totalItems={processedUsers.total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />

      </div>
    </div>
  );
}