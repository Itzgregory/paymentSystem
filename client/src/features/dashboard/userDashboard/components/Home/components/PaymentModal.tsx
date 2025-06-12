"use client";
import React, { useState } from "react";
import { Product } from "../types/product";
import { getAuthToken } from "@/utils/auth/authutils";
import { initializePayment } from "@/app/api/ProductAndPayments/productAndPayment";
import GlobalButton from "@/constants/button";


interface PaymentModalProps {
  product: Product;
  quantity?: number;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, quantity = 1, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setPaymentUrl(null);

    try {
      const token = await getAuthToken();
      if (!token) {
        setError("Please log in to proceed with payment.");
        setLoading(false);
        return;
      }

      const paymentData = {
        total: product.price * quantity,
        items: [{ productId: product._id, quantity }],
      };

      const response = await initializePayment(paymentData, token);
      console.log("Payment initialization response:", response);

      if (response?.success && response?.data?.authorization_url) {
        setPaymentUrl(response.data.authorization_url);
        setReference(response.data.reference);
      } else {
        setError(response?.message || "Payment initialization failed.");
      }
    } catch (error: any) {
      console.error("Payment initiation failed:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const proceedToCheckout = () => {
    if (paymentUrl) {
      window.open(paymentUrl, "_blank");
      setTimeout(onClose, 500);
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="payment-modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 id="payment-modal-title" className="text-2xl font-semibold text-gray-900 mb-4">
          Payment for {product.name}
        </h2>
        <div className="mb-4">
          <p className="text-gray-600">Price: ₦{product.price.toFixed(2)} x {quantity}</p>
          <p className="text-gray-900 font-medium">Total: ₦{(product.price * quantity).toFixed(2)}</p>
        </div>
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {paymentUrl && (
          <div className="mb-4 p-2 bg-[--active-menu-hover] hover:[--button-color] text-[--button-color-active]-700 rounded">
            <p>Payment initialized successfully!</p>
            <p className="text-sm">Reference: {reference}</p>
            <GlobalButton
              onClick={proceedToCheckout}
              className="mt-2 bg-[--button-color]--500 hover:[--button-color]--600"
              disabled={loading}
              aria-label="Proceed to Paystack checkout"
            >
              Pay Now
            </GlobalButton>
          </div>
        )}
        {!paymentUrl && (
          <div className="flex justify-end space-x-4">
            {/* <GlobalButton
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
              disabled={loading}
            >
              Cancel
            </GlobalButton> */}
            <GlobalButton onClick={handlePayment} disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                "Confirm Payment"
              )}
            </GlobalButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;