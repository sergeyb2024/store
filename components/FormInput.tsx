'use client';
import { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export default function FormInput({ label, type, value, onChange, required = false, placeholder }: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="p-2 rounded w-full text-black border border-gray-300"
      />
    </div>
  );
}