'use client';

import { useState, useEffect } from 'react';
import UserCard from '../../../components/UserCard';

// Define the structure of a User
interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Customer';
    lastLogin: string;
}

// Mock function to fetch users
async function fetchUsers(): Promise<User[]> {
    return [
        { id: 1, name: 'John Doe', email: 'john.d@example.com', role: 'Customer', lastLogin: '2025-07-25' },
        { id: 2, name: 'Jane Smith', email: 'jane.s@example.com', role: 'Admin', lastLogin: '2025-07-26' },
        { id: 3, name: 'Peter Jones', email: 'peter.j@example.com', role: 'Customer', lastLogin: '2025-07-20' },
    ];
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Customers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}