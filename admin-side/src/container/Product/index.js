import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Modal from '../../components/UI/Modal';
import './style.css'
import { generatePublicUrl } from '../../axios/urlConfig';
/**
* @author
* @function Product
**/

const Product = (props) => {
  const dispatch = useDispatch();
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDiscription] = useState("");
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);

  const [show, setShow] = useState(false);
  const[productDetailModal,setProductDetailModal] = useState(false);
   const[productDetails,setProductDetails] = useState(null);


  const handleClose = () => {
    // create form to save category details
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('quantity', quantity);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }
    dispatch(addProduct(form));

    setShow(false);
  }
  const handleShow = () => setShow(true);
  //load the category

  useEffect(() => {
    console.log('Category.js')
    // dispatch(getAllCategories());
    console.log("useEffect ca", category)
  }, []);


  //  create category and push on it
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }

    }
    return options;
  }

  // 

  const handleProductImage = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }
  console.log(productPictures);

  // ADD PRODUCT MODAL

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={`Add New Product`}
      >
        <Input
          label="Name"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          placeholder="Enter Quantity name"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          placeholder="Enter price name"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          placeholder="Enter description name"
          value={description}
          onChange={(e) => setDiscription(e.target.value)}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select Category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>
            )
          }
        </select>
        {
          productPictures.length > 0 ?
            productPictures.map((pic, index) =>
              <div key={index}>{JSON.stringify(pic.name)}</div>) : null
        }
        <input
          type="file"
          name="productPictures"
          onChange={handleProductImage}
        />


      </Modal>

    )
  }

        // PRODUCT LIST 
  const renderProductList = () => {
    return (
      <Table  striped bordered hover style={{ paddingTop:" 40px", fontSize:"12px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
           
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            // console.log me product : products
            product.products.length > 0 ?
              product.products.map(product =>
                <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                
                </tr>
              ) : null

          }



        </tbody>
      </Table>
    )
  }

          // PRODUCT DETAILTS MODALS
    
          // on click x it will close
  const handleCloseProductDetailModale =() =>{
    setProductDetailModal(false)
  }

  //   show PRODUCT DETAILS

  const showProductDetailsModal = (product) =>{
    // we pass updatedDetails product
    setProductDetails(product);
    setProductDetailModal(true);
     console.log("product=======>",product)
  }

  const renderProductDetailsModal = () =>{

    if(!productDetails){
      return null
    }
    return (
      <Modal
      show={productDetailModal}
      handleClose={handleCloseProductDetailModale}
      modalTitle={`PRODUCT DETAILS`}
      size="lg">
      <Row>
        <Col md="6">
        <label className="key">Name</label>
        <p className="value">{productDetails.name}</p>
        </Col>
        <Col md="6">
        <label className="key">Price</label>
        <p className="value">{productDetails.price}</p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
        <label className="key">Quantity</label>
        <p className="value">{productDetails.quantity}</p>
        </Col>
        <Col md="6">
        <label className="key">Category</label>
        <p className="value">{productDetails.category.name}</p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
        <label className="key">Description</label>
        <p className="value">{productDetails.description}</p>
        </Col>
      </Row>

      <Row>
          <Col>
            <label>Product Pictures</label>
            <div style={{display:'flex'}} >
            { productDetails.productPictures.map(picture =>
              <div className="productImgContainer">
                <img src={generatePublicUrl(picture.img)}/>
              </div>)}
            </div>

         </Col>
      </Row>
      </Modal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add Product</button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {renderProductList()}
          </Col>
        </Row>

        {/* render Add product modal */}

        {renderAddProductModal() }

        {renderProductDetailsModal()}
      </Container>
    </Layout>
  )

}

export default Product