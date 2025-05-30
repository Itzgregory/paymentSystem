import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../../userDashboard/components/Home/types/product';
import Input from '@/constants/input';
import GlobalButton from '@/constants/button';
import { RootState } from '@/redux/store/store';
import { addProduct } from '@/app/api/ProductAndPayments/productAndPayment';


interface AddProductFormProps {
  onSubmit: (data: Product) => void;
  onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, onClose }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ name?: string; price?: string; api?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; price?: string; api?: string } = {};

    // Client-side validation
    if (!name) {
      newErrors.name = 'Product name is required';
    }
    if (!price) {
      newErrors.price = 'Price is required';
    } else {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = 'Please enter a valid price';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      setErrors({ ...newErrors, api: 'Authentication token is missing. Please log in.' });
      return;
    }

    try {
      const productData = { name, price: parseFloat(price) };
      const response = await addProduct(productData, token);
      if (!response) {
        setErrors({ ...newErrors, api: 'Failed to add product. Please try again.' });
        return;
      }
      onSubmit(response);
      setName('');
      setPrice('');
      setErrors({});
      onClose();
    } catch (error: any) {
      setErrors({
        ...newErrors,
        api: error.response?.data?.message || 'An error occurred while adding the product.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}
      <Input
        id="name"
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
        error={errors.name}
      />
      <Input
        id="price"
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
        step="0.01"
        error={errors.price}
      />
      <div className="flex justify-end space-x-4 mt-4">
        <GlobalButton
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Cancel
        </GlobalButton>
        <GlobalButton type="submit" className="global-button">
          Add Product
        </GlobalButton>
      </div>
    </form>
  );
};

export default AddProductForm;