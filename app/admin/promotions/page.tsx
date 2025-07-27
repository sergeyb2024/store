'use client';

import { useState } from 'react';
import FormInput from '../../../components/FormInput';

// Define the structure for a promotion
interface Promotion {
    id: string;
    code: string;
    discount: number; // Percentage
    isActive: boolean;
    startDate: string;
    endDate: string;
}

// Mock data for existing promotions
const initialPromotions: Promotion[] = [
    { id: 'promo1', code: 'SUMMER25', discount: 25, isActive: true, startDate: '2025-06-01', endDate: '2025-08-31' },
    { id: 'promo2', code: 'NEWYEAR15', discount: 15, isActive: false, startDate: '2025-01-01', endDate: '2025-01-15' },
];

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
    const [newPromo, setNewPromo] = useState({ code: '', discount: 0, startDate: '', endDate: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setNewPromo(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        }));
    };
    
    const handleAddPromotion = (e: React.FormEvent) => {
        e.preventDefault();
        const promotionToAdd: Promotion = {
            ...newPromo,
            id: `promo-${Date.now()}`,
            isActive: true, // New promos are active by default
        };
        setPromotions(prev => [...prev, promotionToAdd]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Promotions</h1>

            {/* Form to add a new promotion */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Create New Promotion</h2>
                <form onSubmit={handleAddPromotion} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <FormInput label="Coupon Code" name="code" value={newPromo.code} onChange={handleInputChange} />
                    <FormInput label="Discount (%)" name="discount" type="number" value={String(newPromo.discount)} onChange={handleInputChange} />
                    <FormInput label="Start Date" name="startDate" type="date" value={newPromo.startDate} onChange={handleInputChange} />
                    <FormInput label="End Date" name="endDate" type="date" value={newPromo.endDate} onChange={handleInputChange} />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 h-10">Add Promotion</button>
                </form>
            </div>

            {/* List of existing promotions */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Active Promotions</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2 border-b">Code</th>
                            <th className="p-2 border-b">Discount</th>
                            <th className="p-2 border-b">Active Dates</th>
                            <th className="p-2 border-b">Status</th>
                            <th className="p-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotions.map(promo => (
                            <tr key={promo.id}>
                                <td className="p-2 border-b">{promo.code}</td>
                                <td className="p-2 border-b">{promo.discount}%</td>
                                <td className="p-2 border-b">{promo.startDate} to {promo.endDate}</td>
                                <td className="p-2 border-b">
                                    <span className={`px-2 py-1 text-xs rounded-full ${promo.isActive ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                        {promo.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-2 border-b">
                                    <button className="text-red-500 hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}