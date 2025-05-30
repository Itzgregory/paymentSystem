"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAuthToken } from "@/utils/auth/authutils";
import GlobalButton from "@/constants/button";

interface PaymentStatusModalProps {
  onClose: () => void;
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({ onClose }) => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return; 
      
      setLoading(true);
      try {
        const token = await getAuthToken();
        if (!token) {
          setError("Please log in to proceed with payment.");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/payments/verify?reference=${reference}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();
        console.log("Verification result:", result);

        if (result.success) {
          setStatus("Payment successful! Your order has been confirmed.");
        } else {
          setError(result.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Error verifying payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  // If no reference is provided, i will not de show modal... i am yet toimplement the webhook, verify payment status endpoint. omo.... 11:35pm
  if (!reference) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="payment-status-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 id="payment-status-title" className="text-2xl font-semibold text-gray-900 mb-4">
          Payment Status
        </h2>

        {loading && (
          <div className="flex items-center space-x-2 mb-4">
            <svg className="animate-spin h-5 w-5 text-gray-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-gray-600">Verifying payment...</p>
          </div>
        )}

        {status && <p className="text-green-700 bg-green-100 p-2 rounded mb-4">{status}</p>}
        {error && <p className="text-red-700 bg-red-100 p-2 rounded mb-4">{error}</p>}

        <div className="flex justify-end space-x-4">
          <GlobalButton onClick={onClose} className="bg-gray-500 hover:bg-gray-600" aria-label="Close modal">
            Close
          </GlobalButton>

          {status && (
            <Link href="/orders">
              <GlobalButton className="bg-blue-500 hover:bg-blue-600">View Orders</GlobalButton>
            </Link>
          )}

          {error && (
            <Link href="/talentdashboard">
              <GlobalButton className="bg-blue-500 hover:bg-blue-600">Return to Dashboard</GlobalButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusModal;
