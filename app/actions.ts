'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Product } from './types/product';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  manufacturer: z.string().min(2, { message: 'Manufacturer is required.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  quantityInStock: z.coerce.number().min(0, { message: 'Stock must be a positive number.' }),
  // Add other fields as needed for validation
});

export async function addProduct(prevState: any, formData: FormData) {
  const validatedFields = productSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real app, you would save this to your database.
  // For now, we'll just log it.
  console.log('New product added:', validatedFields.data);

  revalidatePath('/admin/products');
  return { message: 'Product added successfully.' };
}

export async function updateProduct(productId: string, prevState: any, formData: FormData) {
    const validatedFields = productSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    // Logic to update the product in your data source
    console.log('Updating product:', productId, validatedFields.data);

    revalidatePath(`/admin/products/${productId}`);
    revalidatePath('/admin/products');
    return { message: 'Product updated successfully.' };
}

export async function deleteProduct(productId: string) {
  const filePath = path.join(process.cwd(), 'data/products.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    data.modelKits = data.modelKits?.filter((p: Product) => p.productId !== productId) || [];
    data.paintsAndSupplies = data.paintsAndSupplies?.filter((p: Product) => p.productId !== productId) || [];
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    revalidatePath('/admin/products');
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Failed to delete product.");
  }
}