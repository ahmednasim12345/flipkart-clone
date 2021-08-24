const Category = require('../modals/category');
const slugify = require('slugify');

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        });
    }


    return categoryList;

};

exports.addCategory = (req, res) => {
    categoryObj = new Category({
        name: req.body.name,
        slug: slugify(req.body.name)
    })

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }
    //    Image upload
    if (req.file) {
        categoryObj.categoryImage = process.env.API + '/public' + req.file.filename;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error)
            return res.status(400).json({
                message: "Could not saved Category!"
            })

        if (category) {

            return res.status(201).json({
                message: "Category has been saved",
                category
            })
        }

    })


}

exports.getCategory = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) {
            return res.status(400).json({
                message: "Could not get Category"
            })
        }
        if (categories) {
            const categoryList = createCategories(categories);
            return res.status(200).json({
                message: "Fetched All Category data",
                categoryList
            })
        }
    })
}


// update category
exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
          type: type[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }
  
        const updatedCategory = await Category.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }
      return res.status(201).json({ updateCategories: updatedCategories });
    } else {
      const category = {
        name,
        type,
      };
      if (parentId !== "") {
        category.parentId = parentId;
      }
      const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
        new: true,
      });
      return res.status(201).json({ updatedCategory });
    }
  };

//  delete Categories

exports.deleteCategories = async (req, res) => {

    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
      const deleteCategory = await Category.findOneAndDelete({
        _id: ids[i]._id,
       
      });
      deletedCategories.push(deleteCategory);
    }
  
    if (deletedCategories.length == ids.length) {
      res.status(201).json({ message: "Categories removed" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  };