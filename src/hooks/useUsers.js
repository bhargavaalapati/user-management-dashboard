import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser as deleteUserApi } from '../api/userService';

const DEPARTMENTS = ["Engineering", "Product", "Sales", "Marketing", "HR"];

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                const mappedUsers = response.data.map(user => {
                    const nameParts = user.name.split(' ');
                    return {
                        id: user.id,
                        firstName: nameParts[0] || '',
                        lastName: nameParts.slice(1).join(' ') || '',
                        email: user.email,
                        department: DEPARTMENTS[user.id % DEPARTMENTS.length]
                    };
                });
                setUsers(mappedUsers);
            } catch (err) {
                setError("Failed to load users. Please verify your connection.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // --- WRITE OPERATIONS ---

    const addUser = async (userData) => {
        try {
            const response = await createUser(userData);
            // JSONPlaceholder always returns id: 11, so we force a unique ID for the UI
            const newUser = { ...userData, id: response.data.id === 11 ? Date.now() : response.data.id };
            setUsers(prev => [newUser, ...prev]);
            return { success: true };
        } catch (err) {
            return { success: false, error: "Failed to add user." };
        }
    };

    const editUser = async (id, updatedData) => {
        try {
            await updateUser(id, updatedData);
            setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...updatedData } : user)));
            return { success: true };
        } catch (err) {
            return { success: false, error: "Failed to update user." };
        }
    };

    const removeUser = async (id) => {
        try {
            await deleteUserApi(id);
            setUsers(prev => prev.filter(user => user.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: "Failed to delete user." };
        }
    };

    return { users, loading, error, addUser, editUser, removeUser };
};