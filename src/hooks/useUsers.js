import { useState, useEffect } from 'react';
import { getUsers } from '../api/userService';

const DEPARTMENTS = ["Engineering", "Product", "Sales", "Marketing", "HR"];

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                // Transform data to match assignment requirements
                const mappedUsers = response.data.map(user => {
                    const nameParts = user.name.split(' ');
                    return {
                        id: user.id,
                        firstName: nameParts[0] || '',
                        lastName: nameParts.slice(1).join(' ') || '',
                        email: user.email,
                        // Assign a stable pseudo-random department based on ID
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

    return { users, setUsers, loading, error };
};