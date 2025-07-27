import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Product } from '../../../types/product';

// This function handles GET requests to /api/products
export async function GET() {
  try {
    // Construct the full path to the products.json file
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
    
    // Parse the JSON data
    const data = JSON.parse(fileContents);
    
    // Combine model kits and paints/supplies into a single array
    const products: Product[] = [
      ...(data.modelKits || []),
      ...(data.paintsAndSupplies || []),
    ];

    // Return the products as a JSON response
    return NextResponse.json(products);
  } catch (error) {
    // If there's an error, return a 500 status code and an error message
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}