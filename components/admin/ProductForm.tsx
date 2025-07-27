'use client';

import { useActionState, useFormStatus } from 'react'; // Updated import
import { Product } from '../../types/product';
import { useRouter } from 'next/navigation';

type FormState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
    imageUrl?: string[];
    quantityInStock?: string[];
  };
  message?: string;
};

const initialState: FormState = {};

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {pending ? 'Saving...' : title}
    </button>
  );
}

export default function ProductForm({
  product,
  onSave,
  onDelete,
}: {
  product: Product;
  onSave: (state: FormState, formData: FormData) => Promise<FormState>;
  onDelete: (id: number) => Promise<void>;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState(onSave, initialState); // Renamed hook

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      await onDelete(product.id);
    }
  };

  return (
    <form action={formAction} className="space-y-4 max-w-lg mx-auto">
      <input type="hidden" name="id" value={product.id} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" id="name" name="name" defaultValue={product.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {state?.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description" defaultValue={product.description} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
        {state?.errors?.description && <p className="text-sm text-red-500 mt-1">{state.errors.description[0]}</p>}
      </div>

       <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" name="price" defaultValue={product.price} step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {state?.errors?.price && <p className="text-sm text-red-500 mt-1">{state.errors.price[0]}</p>}
      </div>

       <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input type="text" id="category" name="category" defaultValue={product.category} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {state?.errors?.category && <p className="text-sm text-red-500 mt-1">{state.errors.category[0]}</p>}
      </div>

       <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input type="url" id="imageUrl" name="imageUrl" defaultValue={product.imageUrl} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {state?.errors?.imageUrl && <p className="text-sm text-red-500 mt-1">{state.errors.imageUrl[0]}</p>}
      </div>

      <div>
        <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700">Quantity In Stock</label>
        <input type="number" id="quantityInStock" name="quantityInStock" defaultValue={product.quantityInStock} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {state?.errors?.quantityInStock && <p className="text-sm text-red-500 mt-1">{state.errors.quantityInStock[0]}</p>}
      </div>

      {state?.message && <p className="text-sm text-red-500">{state.message}</p>}

      <div className="flex items-center justify-between">
        <SubmitButton title="Update Product" />
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Product
        </button>
      </div>
    </form>
  );
}