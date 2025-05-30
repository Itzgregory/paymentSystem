"use client";
import { useEffect, useState } from "react";
import Header from "@/features/header/Header";
import ProductList from "./components/ProductList";
import PaymentModal from "./components/PaymentModal";
import AddProductForm from "@/features/dashboard/adminDasboard/components/addproductForm";
import { Product } from "./types/product";
import { Modal } from "react-bootstrap";
import { getProducts } from "@/app/api/ProductAndPayments/productAndPayment";
import { useSearchParams } from "next/navigation";
import PaymentStatusModal from "./components/PaymentStatusModal";

export default function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        console.log("Fetched Products:", data); 
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // i will just try an automatically show status modal if Paystack returns reference
  useEffect(() => {
    if (reference) {
      setShowStatusModal(true);
    }
  }, [reference]);

  const closeStatusModal = () => {
    setShowStatusModal(false);
    window.history.replaceState({}, "", "/talentdashboard");
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setShowStatusModal(false);
  };

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    setProducts([...products, { ...newProduct, id: "" }]);
  };

  return (
    <div className="bg-[var(--page-background)] min-h-screen font-[var(--font-family-cabin)] text-[var(--text-color)] w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 dashboard-layout">
      <Header />
      <main className="space-y-6 md:space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">User Dashboard</h1>
        </div>

        {loading ? (
          <p className="text-[var(--text-color-grey)]">Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ProductList products={products} onProductSelect={handleProductSelect} />
        )}

        {selectedProduct && <PaymentModal product={selectedProduct} onClose={handleCloseModal} />}
        
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Product">
          <AddProductForm
            onSubmit={handleAddProduct}
            onClose={() => setIsAddModalOpen(false)}
          />
        </Modal>

        {showStatusModal && <PaymentStatusModal onClose={closeStatusModal} />}
      </main>
      
    </div>
  );
}
