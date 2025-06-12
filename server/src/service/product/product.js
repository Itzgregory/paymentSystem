const ProductDAO = require('../../dal/dao/products/productsDao');
const { logerror } = require('../../helpers/logger');

class ProductService {
    constructor() {
        this.productDAO = new ProductDAO();
    }

    async addProduct(productData, user) {
        try {
            if (user.role !== 'admin') {
                return { status: 403, success: false, message: 'Only admins can add products', data: null };
            }

            if (!productData.name || !productData.description || !productData.code || !productData.category || !productData.price || !productData.stock) {
                return { status: 400, success: false, message: 'Missing required product fields', data: null };
            }

            const result = await this.productDAO.createProduct(productData, user._id);
            if (!result.success) {
                return { status: 500, success: false, message: result.message, data: null };
            }

            return { status: 201, success: true, message: 'Product added successfully', data: result.data };
        } catch (err) {
            logerror.error('Error in addProduct:', err);
            return { status: 500, success: false, message: 'Failed to add product', data: null };
        }
    }

    async getProducts({ limit, skip, category }) {
        try {
            const result = await this.productDAO.getProducts({ limit, skip, category });
            if (!result.success) {
                return { status: 500, success: false, message: result.message, data: null };
            }

            return { status: 200, success: true, message: 'Products retrieved successfully', data: result.data };
        } catch (err) {
            logerror.error('Error in getProducts:', err);
            return { status: 500, success: false, message: 'Failed to retrieve products', data: null };
        }
    }

  async validateOrderItems(items, providedTotal) {
    try {
      let calculatedTotal = 0;
      const validatedItems = [];

      for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          return { status: 400, success: false, message: `Invalid productId or quantity for item`, data: null };
        }
        const result = await this.productDAO.getProductById(item.productId); 
        if (!result.success || !result.data) {
          return { status: 400, success: false, message: result.message || `Product ${item.productId} not found`, data: null };
        }
        const product = result.data;
        if (product.stock < item.quantity) {
          return { status: 400, success: false, message: `Insufficient stock for ${product.name}`, data: null };
        }
        calculatedTotal += product.price * item.quantity;
        validatedItems.push({ productId: item.productId, quantity: item.quantity });
      }

      // Validate provided total (in NGN) against calculated total
      if (providedTotal !== undefined && Math.abs(providedTotal - calculatedTotal) > 0.01) {
        return {
          status: 400,
          success: false,
          message: `Invalid total: provided ${providedTotal} NGN, calculated ${calculatedTotal} NGN`,
          data: null,
        };
      }

      return {
        status: 200,
        success: true,
        message: 'Items and total validated',
        data: { items: validatedItems, total: calculatedTotal * 100 }, 
      };
    } catch (err) {
      logerror.error('Error validating order items:', err);
      return { status: 500, success: false, message: 'Validation failed', data: null };
    }
  }
}

module.exports = ProductService;