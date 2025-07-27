'use client';

import { useState } from 'react';
import FormInput from '../../../components/FormInput';

export default function SettingsPage() {
    const [storeName, setStoreName] = useState('Hobby Shop');
    const [storeEmail, setStoreEmail] = useState('contact@hobbyshop.com');
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassword(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <div className="space-y-8">
                {/* Store Settings */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Store Information</h2>
                    <form className="space-y-4">
                        <FormInput
                            label="Store Name"
                            id="storeName"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                        <FormInput
                            label="Contact Email"
                            id="storeEmail"
                            type="email"
                            value={storeEmail}
                            onChange={(e) => setStoreEmail(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Save Store Info
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Change Admin Password</h2>
                    <form className="space-y-4">
                        <FormInput
                            label="Current Password"
                            id="current"
                            name="current"
                            type="password"
                            value={password.current}
                            onChange={handlePasswordChange}
                        />
                        <FormInput
                            label="New Password"
                            id="new"
                            name="new"
                            type="password"
                            value={password.new}
                            onChange={handlePasswordChange}
                        />
                         <FormInput
                            label="Confirm New Password"
                            id="confirm"
                            name="confirm"
                            type="password"
                            value={password.confirm}
                            onChange={handlePasswordChange}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}