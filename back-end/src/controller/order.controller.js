const Cart = require("../modals/cart")
const Order = require('../modals/order');
exports.addOrder = (req, res) => {
    //  once order is placed cart will be deleted
    // there is no item into cart 
    Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
        if (error) {
            return res.status(400).json({
                message: "Error",
                error
            })
        }
        if (result) {
            req.body.user = req.user._id;
            //  orderStatus
            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true
                },
                {
                    type: "packed",
                    date: new Date(),
                    isCompleted: false
                },
                {
                    type: "shipped",
                    date: new Date(),
                    isCompleted: false
                },
                {
                    type: "delivered",
                    date: new Date(),
                    isCompleted: false
                },
            ];

            const _order = new Order(req.body);
            _order.save((error, orders) => {
                if (error) {
                    return res.status(400).json({
                        message: error
                    })
                }
                if (orders) {
                    res.status(201).json({
                        message: 'order placed Confirmed',
                        orders
                    })
                }
            })
        }
    })

}

exports.getOrders = (req, res) => {
    Order.find({ user: req.user._id })
        .select("_id paymentStatus items")
        .populate("items.productId", "_id name productPictures")
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json({
                    message: 'Could not fetched the orders'
                })
            }
            if (orders) {
                return res.status(200).json({
                    message: "fetched user oders ",
                    orders
                })
            }
        })
}