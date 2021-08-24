const Order = require('../../modals/order');

exports.updateOrder =(req,res) =>{
    Order.updateOne(
        {user: req.body.userId, "orderStatus.type": req.body.type },
        {
            $set: {
                "orderStatus.$" : [{ type: req.body.type, date: new Date(), isCompleted: true}],
            }
        }
    ).exec((error,order) =>{
        if(error){
            return res.status(400).json({
                message:"Error",
                error
            })
        }
        if(order){
            res.status(201).json({
               message: "Order status updated",
                order
            })
        }

    })

}