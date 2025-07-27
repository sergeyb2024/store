'use client';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Customer';
    lastLogin: string;
}

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm mt-2">Role: 
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    user.role === 'Admin' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'
                }`}>
                    {user.role}
                </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Last Login: {user.lastLogin}</p>
            <div className="mt-4 flex justify-end space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
            </div>
        </div>
    );
}