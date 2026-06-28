import React, { useState, useMemo } from 'react';
import { useUsers } from './hooks/useUsers';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import { Search, UserPlus } from 'lucide-react';

export default function App() {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteData, setDeleteData] = useState({ isOpen: false, user: null });

  // Action Handlers
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      await editUser(editingUser.id, formData);
    } else {
      await addUser(formData);
    }
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleConfirmDelete = async () => {
    await removeUser(deleteData.user.id);
    setDeleteData({ isOpen: false, user: null });
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  // Memoized Search, Sort, and Pagination
  const processedUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let sorted = filtered.sort((a, b) => {
      const aVal = String(a[sortConfig.key]).toLowerCase();
      const bVal = String(b[sortConfig.key]).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    return {
      paginated: sorted.slice(startIndex, startIndex + itemsPerPage),
      total: sorted.length
    };
  }, [users, searchQuery, sortConfig, currentPage, itemsPerPage]);

  if (loading) return <div className="flex h-screen items-center justify-center font-bold">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-600 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">User Management Dashboard</h1>
          <button onClick={() => setIsFormOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <UserPlus size={20} /> <span>Add User</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <UserTable
          users={processedUsers.paginated}
          onSort={handleSort}
          sortConfig={sortConfig}
          onEdit={openEditModal}
          onDelete={(user) => setDeleteData({ isOpen: true, user })}
        />
        <Pagination
          totalItems={processedUsers.total}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>

      {/* Modals */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingUser(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
      />
      <ConfirmDelete
        isOpen={deleteData.isOpen}
        userName={deleteData.user ? `${deleteData.user.firstName} ${deleteData.user.lastName}` : ''}
        onClose={() => setDeleteData({ isOpen: false, user: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}