'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Product } from './types/product';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().min(0.01, { message: 'Price must be a positive number.' }),
  category: z.string().min(2, { message: 'Category must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  quantityInStock: z.coerce.number().int().min(0, { message: 'Stock must be a non-negative integer.' }),
});

// ... (your existing addProduct function)

export async function addProduct(prevState: any, formData: FormData) {
  const validatedFields = productSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(jsonDirectory, 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct: Product = {
      id: newId,
      ...validatedFields.data,
      rating: 0,
      reviews: [],
    };

    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

  } catch (e) {
    return {
      message: 'Failed to add product.',
    };
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}


// NEW: Function to update a product
export async function updateProduct(prevState: any, formData: FormData) {
  const validatedFields = productSchema.safeParse(Object.fromEntries(formData.entries()));
  const productId = Number(formData.get('id'));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(jsonDirectory, 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let products: Product[] = JSON.parse(fileContents);

    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
      return { message: 'Product not found.' };
    }
    
    const updatedProduct = {
        ...products[productIndex],
        ...validatedFields.data,
    };

    products[productIndex] = updatedProduct;

    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

  } catch (e) {
    return { message: 'Failed to update product.' };
  }
  
  revalidatePath(`/admin/products`);
  revalidatePath(`/admin/products/${productId}`);
  redirect('/admin/products');
}

// NEW: Function to delete a product
export async function deleteProduct(id: number) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const filePath = path.join(jsonDirectory, 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let products: Product[] = JSON.parse(fileContents);

    const updatedProducts = products.filter(p => p.id !== id);

    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));

  } catch (e) {
    console.error('Failed to delete product:', e);
    // In a real app, you might want to return an error message
  }

  revalidatePath('/admin/products');
  redirect('/admin/products');
}