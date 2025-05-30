"use client"
import React from 'react';
import ProductItem from './ProductItem';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-[var(--text-color-grey)]">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id || product.name}
              product={product}
              onBuyClick={onProductSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;