"use client"
import React from 'react';
import GlobalButton from '../../../../../../constants/button';
import { Product } from '../types/product';

interface ProductItemProps {
  product: Product;
  onBuyClick: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onBuyClick }) => {
  return (
    <div className="border border-[var(--border-color)] p-4 rounded-lg shadow-[var(--shadow-color)] bg-[var(--bg-light-color)]">
      <h3 className="text-lg font-semibold text-[var(--text-color)]">{product.name}</h3>
      <p className="text-[var(--text-color-grey)] mb-4">
        Price: ₦{product.price.toFixed(2)}
      </p>
      <GlobalButton onClick={() => onBuyClick(product)}>
        Buy
      </GlobalButton>
    </div>
  );
};

export default ProductItem;