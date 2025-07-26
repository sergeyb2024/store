import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '../../../types/product';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data/products.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  const products: Product[] = [
    ...(data.modelKits || []),
    ...(data.paintsAndSupplies || []),
  ];
  return NextResponse.json(products);
}