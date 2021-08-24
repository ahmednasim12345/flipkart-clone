import React, { useState ,useEffect} from 'react'
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategoriesAction, getAllCategories, updatedCategories } from '../../actions';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import './style.css'
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosChatboxes,
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosAdd,
  IoIosCloudUpload,
  IoIosTrash
} from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
/**
* @author
* @function Category
**/

const Category = (props) => {

  // Modal
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parenCategorytId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  // for update and delete purpose
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updatedCategoryModal, setUpdatedCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector(state => state.category);


    // updating dispatch

    useEffect(() =>{
      if(!category.loading){
        setShow(false)
      }

    },[category.loading]);


  const handleClose = () => {
    // create form to save category details
    const form = new FormData();
     if(categoryName === "") {
       alert('Category Name is required');
       setShow(false);
       return;
     }
    form.append('name', categoryName);
    form.append('parentId', parenCategorytId);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
    // console.log("form data",cat);

    setShow(false);
  }
  const handleShow = () => setShow(true);
  //load the category

  const renderCategories = (categories) => {
    console.log("categories ==>", categories)
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        //  we have to create a object
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }

      );
    }
    return myCategories;
  }
  //  create category and push on it
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      console.log("category------>",category)
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      })
      
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }

  {/* function Update category */ }

  const updateCategory = () => {
    renderCheckedAndExpandedCategories();
    setUpdatedCategoryModal(true);
  }

  const renderCheckedAndExpandedCategories = () => {

    const categories = createCategoryList(category.categories);
    //  we are binding whatever we are checking by id
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId === category.value);
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId === category.value);
      category && expandedArray.push(category);
    })

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log("checked, expanded, categories",
      checked, expanded, categories);

    console.log("checked ,expanded", checkedArray, expandedArray);


  }

  // handle Updated Category

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
      setExpandedArray(updatedExpandedArray)

    }
  }

  const renderAddCategoriesModal = () => {
    return (
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modalTitle={`Add New Category`}>
        <Input
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <select
          className="form-control"
          value={parenCategorytId}
          onChange={(e) => setParentCategoryId(e.target.value)}>
          <option>select Category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>
            )
          }
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />

      </Modal>
    )
  }

  const updateCategoryForm = () => {

    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type', item.type);
    })
    dispatch(updatedCategories(form));
     
  }
  // updated category modal
  const renderUpdatedCategoriesModal = () => {
    return (
      <Modal
        show={updatedCategoryModal}
        handleClose={() => setUpdatedCategoryModal(false)}
        onSubmit={updateCategoryForm}
        modalTitle={`UPDATED CATEGORIES`}
        size="lg">
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
      
        {
          expandedArray.length > 0 &&
          expandedArray.map((item, index) =>
            <Row key={index}>

              <Col>
                <Input
                  placeholder="Enter category name"
                  value={item.name}
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                  <option>select Category</option>
                  {
                    createCategoryList(category.categories).map(option =>
                      <option key={option.value} value={option.value}>{option.name}</option>
                    )
                  }
                </select>
              </Col>
              <Col>
                <select className="form-control"
                value={item.type}
                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>

                </select>
              </Col>
            </Row>
          )
        }
   <h6>Chacked Categories</h6>

        {
          checkedArray.length > 0 &&
          checkedArray.map((item, index) =>
            <Row key={index}>

              <Col>
                <Input
                  placeholder="Enter category name"
                  value={item.name}
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                  <option>select Category</option>
                  {
                    createCategoryList(category.categories).map(option =>
                      <option key={option.value} value={option.value}>{option.name}</option>
                    )
                  }
                </select>
              </Col>
              <Col>
                <select className="form-control"
                   value={item.type}
                   onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
               >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>

                </select>
              </Col>
            </Row>
          )
        }

      </Modal>
    )
  }




  // delete category

  const deleteCategory = () => {
    renderCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  }


  // deleteCategory Array
  const deleteCategories = () => {
    const checkedIdArray = checkedArray.map((item, index) => ({ _id: item.value }));
    const expandedIdArray = expandedArray.map((item, index) => ({ _id: item.value }))
    const idsArrays = expandedIdArray.concat(checkedIdArray);

    if (checkedArray.length > 0) {
      // we have to dispatch action
      dispatch(deleteCategoriesAction(checkedIdArray))
        .then(result => {
          if (result) {
            dispatch(getAllCategories());
            setDeleteCategoryModal(false);
          }
        });
    }
    setDeleteCategoryModal(false);
  }

  // Delete category Modal
  const renderDeleteCategoryModal = () => {

    console.log("delete", checkedArray);
    return (
      <Modal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => {
              alert('no')
            }
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: deleteCategories
          }
        ]}>

        <h5>Expanded</h5>
        {expandedArray.map((item, index) =>
          <span key={index}>{item.name}</span>)}

        <h5>Checked</h5>
        {checkedArray.map((item, index) =>
          <span key={index}>{item.name}</span>)}
      </Modal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span>Actions :</span>
                <button onClick={handleShow}> <IoIosAdd/><span>Add Category</span> </button>
                <button onClick={deleteCategory}> <IoIosTrash/> <span>Delete</span> </button>
                <button onClick={updateCategory}><IoIosCloudUpload /> <span> Edit</span></button>

              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>
                  {
                  renderCategories(category.categories)
                  } 
                  /* {JSON.stringify(createCategoryList(category.categories))} 
                  </ul> */}

            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,

              }}
            />
          </Col>
        </Row>
      </Container>


      {/* add categoriesModal */}
      {renderAddCategoriesModal()}

      {/* updatedCategories Modal */}
      {renderUpdatedCategoriesModal()}

      {/* delete category modal */}
      {renderDeleteCategoryModal()}


    </Layout>
  )

}

export default Category;