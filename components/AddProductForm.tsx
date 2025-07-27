'use client';

import { useActionState, useFormStatus } from 'react'; // Updated import
import { addProduct } from '../app/actions';

const initialState = {
  message: null,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
      {pending ? 'Adding Product...' : 'Add Product'}
    </button>
  );
}

export default function AddProductForm() {
  const [state, formAction] = useActionState(addProduct, initialState); // Renamed hook

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        {state.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description" rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        {state.errors?.description && <p className="text-sm text-red-500 mt-1">{state.errors.description[0]}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" name="price" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        {state.errors?.price && <p className="text-sm text-red-500 mt-1">{state.errors.price[0]}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input type="text" id="category" name="category" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        {state.errors?.category && <p className="text-sm text-red-500 mt-1">{state.errors.category[0]}</p>}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input type="url" id="imageUrl" name="imageUrl" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        {state.errors?.imageUrl && <p className="text-sm text-red-500 mt-1">{state.errors.imageUrl[0]}</p>}
      </div>

      <div>
        <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700">Quantity In Stock</label>
        <input type="number" id="quantityInStock" name="quantityInStock" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        {state.errors?.quantityInStock && <p className="text-sm text-red-500 mt-1">{state.errors.quantityInStock[0]}</p>}
      </div>

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}

      <SubmitButton />
    </form>
  );
}