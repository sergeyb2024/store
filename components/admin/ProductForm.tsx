'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '../../types/product';
import FormInput from '../FormInput';

// A new component for the submit button to show a pending state
function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {pending ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
    </button>
  );
}

interface ProductFormProps {
  productData?: Partial<Product>;
  isEditing?: boolean;
  formAction: (prevState: any, formData: FormData) => Promise<any>;
}

export default function ProductForm({ productData, isEditing = false, formAction }: ProductFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(formAction, initialState);

  return (
    <form action={dispatch} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Product Name" name="name" defaultValue={productData?.name} error={state.errors?.name} />
        <FormInput label="Manufacturer" name="manufacturer" defaultValue={productData?.manufacturer} error={state.errors?.manufacturer} />
        <FormInput label="Model Number" name="modelNumber" defaultValue={productData?.modelNumber} />
        <FormInput label="Scale" name="scale" defaultValue={productData?.scale} />
        <FormInput label="Price" name="price" type="number" step="0.01" defaultValue={String(productData?.price || 0)} error={state.errors?.price} />
        {/* FIX: Changed productD to productData */}
        <FormInput label="Stock" name="quantityInStock" type="number" defaultValue={String(productData?.quantityInStock || 0)} error={state.errors?.quantityInStock} />
      </div>
      
      <textarea name="description" placeholder="Description" defaultValue={productData?.description} className="w-full p-2 border rounded" />
      <FormInput label="Image URL" name="imageURL" defaultValue={productData?.imageURL} />

      {/* Submit Button */}
      <SubmitButton isEditing={isEditing} />

      {/* Display success or error messages */}
      {state.message && <p className="text-green-600">{state.message}</p>}
    </form>
  );
}