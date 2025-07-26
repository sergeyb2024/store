'use client';
import { useState, useEffect } from 'react';
import UserCard from '../../../../components/admin/UserCard';
import { User } from '../../../../types/product';

async function fetchUsers(): Promise<User[]> {
  // Mock API call
  return [
    { id: 'USR001', name: 'John Doe', email: 'john@example.com', addresses: [{ id: 'ADR001', address: '123 Main St' }] },
    { id: 'USR002', name: 'Jane Smith', email: 'jane@example.com', addresses: [] },
  ];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}