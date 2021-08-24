const Page = require('../../modals/page')

exports.createPage = (req, res) => {
    const { products, banners } = req.files;
    // console.log("====> { products, banners } : ",  JSON.stringify({ products, banners }))
    // these two function return complete new array
    // 
    if (banners && banners.length > 0) {
        // we will create arrays of bannes
        req.body.banners = banners.map((banner) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            // it is banner we will add some flag
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))

    }

    if (products && products.length > 0) {
        // we will create arrays of bannes
        console.log("====> ")
        req.body.products = products.map((product,index) => ({

            img: `${process.env.API}/public/${product.filename}`,
            // it is banner we will add some flag
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));

    }
    //   page createBy

    req.body.createdBy = req.user._id;
    //    if there alredy page exits update that one
    Page.findOneAndUpdate({ category: req.body.category }, req.body)
        .exec((error, updatedPage) => {
            if (error) {
                return res.status(400).json({
                    message: 'Could not update page'
                })
            }
            if (updatedPage) {
                return res.status(201).json({
                    message: 'Page Updated Successfull'
                })

            } else {
                //  we have to create the page
                const page = new Page(req.body);
                page.save((error, page) => {
                    if (error) return res.status(400).json({ error });
                    if (page) {
                        return res.status(201).json({
                            message: 'New Page has been Created',
                            page
                        });
                    }
                });

            }
        })

}



// GET PAGE

exports.getPage = (req, res) => {
    const { category, type } = req.params;
    if (type === "page") {
        Page.findOne({ category: category }).exec((error, page) => {
            if (error) return res.status(400).json({ error });
            if (page) return res.status(200).json({ page });
        });
    }
};