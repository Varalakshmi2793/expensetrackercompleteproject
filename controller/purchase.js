const Razorpay = require('razorpay');
const Order = require('../model/purchase');

exports.createPurchase = async (req, res) => {
    try {

        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const amount = 10000; 
        const currency = 'INR';

        const order = await rzp.orders.create({ amount, currency });

        await req.user.createOrder({ orderid: order.id, status: 'PENDING' });

        return res.status(201).json({ order, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

exports.transaction = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        console.log(order_id);

        const order = await Order.findOne({ where: { orderid: order_id } });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
       
       
   
        await order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        await req.user.update({ ispremiumuser: true });
               
        return res.status(202).json({ success: true, message: "Transaction successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
