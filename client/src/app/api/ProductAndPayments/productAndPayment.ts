import axiosInstance from '../../../utils/axios/axiosInstance';
import handleError from '../../../utils/errorHandler/errorHandler';

export const addProduct = async (productData: any, token: any) => {
  try {
    const url = '/products/add';
    const query = await axiosInstance.post(url, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return query.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    const url = "/products/";
    const query = await axiosInstance.get(url);
    return query.data?.data?.products || [];
  } catch (error) {
    handleError(error);
    return [];
  }
};


export const initializePayment = async (paymentData: any, token: string) => {
  try {
    const url = "/payments/initialize";
    const response = await axiosInstance.post(url, paymentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Payment initialized:", response.data); 
    return response.data;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
      // @ts-ignore
      console.error("Payment initialization error:", error.response.data);
    } else if (error && typeof error === 'object' && 'message' in error) {
      // @ts-ignore
      console.error("Payment initialization error:", error.message);
    } else {
      console.error("Payment initialization error:", error);
    }
    handleError(error);
    return null;
  }
};


export const verifyPaymentEndpoint = async (
  reference: string,
  options: { headers: { Authorization: string } }
) => {
  try {
    const url = `/payments/verify?reference=${reference}`;
    const response = await axiosInstance.get(url, options);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
