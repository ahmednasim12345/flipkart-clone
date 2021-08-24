const { default: slugify } = require('slugify');

const Category = require('../modals/category');
const Product = require('../modals/product');

exports.addProduct = (req, res) => {
    // res.status(200).json({
    //     file : req.files,
    //     body: req.body
    // })
    const { name, price, description, quantity, category,
        createdBy } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if (error)
            return res.status(400).json({ error });

        if (product) {
            res.status(201).json({ product })
        }
    })
    )
}

//  FLITER PRODUCT PRICES
 function filterProductsInPriceRange(products,minPrice ,maxPrice){
     return products.filter(p => p.price > minPrice && p.price <= maxPrice)
 }

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((error, category) => {
            if (error) {
                 res.status(400).json({
                    message: "Error not getBySlug"
                })
            }

            if (category) {
                Product.find({ category: category._id })
                .then(async (products) =>{
                    res.status(200).json({
                        products,
                        productsByPrice : {
                            under5K : await filterProductsInPriceRange(products, 0, 5000),
                            under10K : await filterProductsInPriceRange(products, 5000, 10000),
                            under15K : await filterProductsInPriceRange(products, 10000, 15000),
                            under20K : await filterProductsInPriceRange(products, 15000, 20000),
                            under25K : await filterProductsInPriceRange(products, 20000, 25000),
                            under30K : await filterProductsInPriceRange(products, 25000, 30000),
                          }
                    
                    });
                });
                  
                 
            }
           
        
        });

} 

// getProductDetailsById 
exports.getProductDetailsById  = (req,res) =>{
 const {productId} = req.params;
 if(productId){
     Product.findOne({ _id: productId})
     .exec((error,product) =>{
         if(error)
         return res.status(400).json({
             message:'Somrting went wrong'
         })
         if(product){
             res.status(200).json({
                 message:'Product get Successfully',
                 product
             })
         }
     });
 } else{
     return res.status(400).json({
         error:'Params is required'
     })
 }   

}