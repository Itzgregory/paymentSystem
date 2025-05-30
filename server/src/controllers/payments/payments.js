const PaymentService = require('../../service/payment/PaymentService');
const { logerror } = require('../../helpers/logger');

const paymentControllers = () => {
    return {
        initializePayment: async (req, res) => {
            try {
                console.log("Received user:", req.user); 
                const user = req.user; 
                const { total, items } = req.body;

                if (!user || !user.email) {
                    return res.status(401).json({
                        success: false,
                        message: "User authentication failed",
                        data: null,
                    });
                }

                if (!total || !items || !Array.isArray(items)) {
                    return res.status(400).json({
                        success: false,
                        message: "Total and items are required",
                        data: null,
                    });
                }

                const paymentService = new PaymentService();
                const result = await paymentService.initializePayment(user, { total, items });

                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: result.data,
                });
            } catch (err) {
                logerror.error("Error in initializePayment:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                    data: null,
                });
            }
        },


      verifyPayment: async (req, res) => {
      try {
        const { reference } = req.query;
        if (!reference) {
          return res.status(400).json({
            success: false,
            message: "Reference is required",
            data: null,
          });
        }

        const paymentService = new PaymentService();
        const result = await paymentService.verifyPayment(reference);

        return res.status(result.status).json({
          success: result.success,
          message: result.message,
          data: result.data,
        });
      } catch (err) {
        logerror.error("Error verifying payment:", err);
        return res.status(500).json({
          success: false,
          message: "Verification failed",
          data: null,
        });
      }
    },

    verifyPaymentCallback: async (req, res) => {
      try {
        const { reference } = req.query;
        if (!reference) {
          return res.status(400).json({
            success: false,
            message: "Reference is required",
            data: null,
          });
        }

        res.redirect(`http://localhost:3000/talentdashboard?reference=${reference}`);
      } catch (err) {
        logerror.error("Error in payment callback:", err);
        res.status(500).json({
          success: false,
          message: "Callback processing failed",
          data: null,
        });
      }
    },

    handleWebhook: async (req, res) => {
      try {
        const signature = req.headers["x-paystack-signature"];
        const hash = crypto
          .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
          .update(JSON.stringify(req.body))
          .digest("hex");

        if (hash !== signature) {
          logerror.error("Invalid webhook signature");
          return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        const event = req.body;
        console.log("Webhook event:", event);

        if (event.event === "charge.success") {
          const { reference } = event.data;
          const paymentService = new PaymentService();
          const result = await paymentService.verifyPayment(reference);

          if (!result.success) {
            logerror.error("Webhook verification failed:", result.message);
          }
        }

        res.status(200).json({ success: true, message: "Webhook received" });
      } catch (err) {
        logerror.error("Error handling webhook:", err);
        res.status(500).json({ success: false, message: "Webhook processing failed" });
      }
    },
  };
};

module.exports = paymentControllers;