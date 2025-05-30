"use client";
import Header from "@/features/header/Header";
import GlobalButton from "@/constants/button";
import AddProductForm from "@/features/dashboard/adminDasboard/components/addproductForm";
import { Product } from "../../userDashboard/components/Home/types/product";
import { useState } from "react";
import ProductList from "../../userDashboard/components/Home/components/ProductList";
import PaymentModal from "../../userDashboard/components/Home/components/PaymentModal";
import Modal from "@/constants/modal";


export default function AdminDashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="bg-[var(--page-background)] min-h-screen font-[var(--font-family-cabin)] text-[var(--text-color)] w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 dashboard-layout">
      <Header />
      <main className="space-y-6 md:space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">My E-commerce App</h1>
          <GlobalButton
            onClick={() => setIsAddModalOpen(true)}
            className="last-two"
          >
            Add Product
          </GlobalButton>
        </div>
        <ProductList products={products} onProductSelect={handleProductSelect} />
        {selectedProduct && (
          <PaymentModal product={selectedProduct} onClose={handleCloseModal} />
        )}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Product">
          <AddProductForm
            onSubmit={handleAddProduct}
            onClose={() => setIsAddModalOpen(false)}
          />
        </Modal>
      </main>
    </div>
  );
}