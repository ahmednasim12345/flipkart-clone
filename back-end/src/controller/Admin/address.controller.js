const { json } = require('body-parser');
const UserAddress = require('../../modals/address')
exports.addAddress = (req,res) =>{
    //  we take all data from req.body
  const {payload} = req.body;
  if(payload.address){
      if(payload.address._id){
       UserAddress.findOneAndUpdate(
           { user: req.body._id,"address._id": payload.address._id},
           {
               $set: {
                   "address.$" : payload.address,
               },
           }
       ).exec((error,address) =>{
           if(error){
               return res.status(400).json({
                   message:'could not updated'
               })
           }
           if(address){
               return res.status(201).json({
                   message:'address has been updated',
                   address
               })
           }
       })
      }else{

         //   user exits push address in children [address schema]
    UserAddress.findOneAndUpdate({ user: req.user._id},{
        "$push": {
            "address": payload.address } 
        }, {new: true, upsert: true})
        .exec((error,address) => {
            if(error){
                return res.status(400).json({
                    message: 'could not save address'
                })
            }
            if(address) {
                res.status(201).json({
                    message: 'address has been saved',
                    address
                })
            }
        }) 
      }

  }else{
      res.status(400).json({
          error: 'Params  address is required'
      })
  }
}
exports.getAddress = (req,res) => {
    console.log("\n\n===-=> addresss.....")
    UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
        if (error) return res.status(400).json({
            message:'could not get the address',
             error 
            });
        if (userAddress) {
          return res.status(200).json({ 
              message:"fetched the address",
              userAddress });
        }
        return res.status(401).json({ 
            message:"Address not found",
        });
      });
    };