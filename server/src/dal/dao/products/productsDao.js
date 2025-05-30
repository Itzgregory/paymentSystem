const Product = require('../../../models/products/products')
const { logerror } = require('../../../helpers/logger');

class ProductDAO {
    async createProduct(productData, user) {
        try {
            const product = new Product({
                ...productData,
                timeStamp: new Date().toISOString(),
            });
            await product.save();
            return { success: true, data: product };
        } catch (err) {
            logerror.error('Error creating product:', err);
            return { success: false, message: err.message, data: null };
        }
    }

    async getProducts({ limit = 10, skip = 0, category = null }) {
        try {
            const query = category ? { category } : {};
            const products = await Product.find(query)
                .limit(limit)
                .skip(skip)
                .select('-createdBy -__v');
            const total = await Product.countDocuments(query);
            return { success: true, data: { products, total } };
        } catch (err) {
            logerror.error('Error fetching products:', err);
            return { success: false, message: err.message, data: null };
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId).select('-createdBy -__v');
            if (!product) {
                return { success: false, message: 'Product not found', data: null };
            }
            return { success: true, data: product };
        } catch (err) {
            logerror.error('Error fetching product by ID:', err);
            return { success: false, message: err.message, data: null };
        }
    }

    async checkStock(productId, quantity) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return { success: false, message: 'Product not found', data: null };
            }
            if (product.stock < quantity) {
                return { success: false, message: `Insufficient stock for ${product.name}`, data: null };
            }
            return { success: true, data: product };
        } catch (err) {
            logerror.error('Error checking stock:', err);
            return { success: false, message: err.message, data: null };
        }
    }

    async updateStock(productId, quantity) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return { success: false, message: 'Product not found', data: null };
            }
            product.stock -= quantity;
            await product.save();
            return { success: true, data: product };
        } catch (err) {
            logerror.error('Error updating stock:', err);
            return { success: false, message: err.message, data: null };
        }
    }
}

module.exports = ProductDAO;