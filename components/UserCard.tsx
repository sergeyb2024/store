import { User } from '../../types/product';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-600">Email: {user.email}</p>
      <p className="text-sm">User ID: {user.id}</p>
      <p className="text-sm">Addresses: {user.addresses?.length || 0}</p>
      {user.addresses && user.addresses.length > 0 && (
        <ul className="mt-2 text-sm">
          {user.addresses.map(addr => (
            <li key={addr.id}>{addr.address}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
