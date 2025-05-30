const ProductService = require('../../service/product/product');
const { logerror } = require('../../helpers/logger');

const productControllers = () => {
    return {
        addProduct: async (req, res) => {
            try {
                const user = req.user; 
                const productData = req.body;

                if (!user || !user._id) {
                    return res.status(400).json({
                        success: false,
                        message: "User ID is required",
                        data: null,
                    });
                }


                const productService = new ProductService();
                const result = await productService.addProduct(productData, user);

                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: result.data,
                });
            } catch (err) {
                logerror.error('Error in addProduct:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    data: null,
                });
            }
        },

        getProducts: async (req, res) => {
            try {
                const { limit = 10, skip = 0, category } = req.query;

                const productService = new ProductService();
                const result = await productService.getProducts({
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    category,
                });

                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: result.data,
                });
            } catch (err) {
                logerror.error('Error in getProducts:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                    data: null,
                });
            }
        },
    };
};

module.exports = productControllers;