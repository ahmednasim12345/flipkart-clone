 import React  from 'react';
 import Input from '../../../components/UI/Input';
 import Modal from '../../../components/UI/Modal';
import { Container, Row, Col } from 'react-bootstrap'
// updated category modal
const UpdateCategoriesModal =(props) =>{

  const {
    size,
    show,
    handleClose,
    modalTitle,
    handleCategoryInput,
    expandedArray,
    checkedArray,
    categoryList } = props;
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        size={size}>
          <Row>
          <Col>
          <h6>Expanded</h6>
          </Col>
        </Row> 
        <h3>Chacked Categories</h3>
        {
          expandedArray.length > 0 && 
          expandedArray.map((item,index) =>
          <Row key={index}>
        
          <Col>
          <Input
            placeholder="Enter category name"
            value={item.name}
            onChange={(e) => handleCategoryInput('name',e.target.value, index, 'expanded')}
          />
          </Col>
          <Col>
          <select
            className="form-control"
            value={item.parentId}
            onChange={(e) => handleCategoryInput('parentId',e.target.value, index, 'expanded')}>
            <option>select Category</option>
            {
              categoryList.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
              )
            }
          </select>
          </Col>
          <Col>
           <select className="form-control">
             <option value="">Select Type</option>
             <option value="store">Store</option>
             <option value="product">Product</option>
             <option value="page">Page</option>
            
           </select>
          </Col>
        </Row>
          )
        }
 

{
          checkedArray.length > 0 && 
          checkedArray.map((item,index) =>
          <Row key={index}>
        
          <Col>
          <Input
            placeholder="Enter category name"
            value={item.name}
            onChange={(e) => handleCategoryInput('name',e.target.value, index, 'checked')}
          />
          </Col>
          <Col>
          <select
            className="form-control"
            value={item.parentId}
            onChange={(e) => handleCategoryInput('parentId',e.target.value, index, 'checked')}>
            <option>select Category</option>
            {
              categoryList.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
              )
            }
          </select>
          </Col>
          <Col>
           <select className="form-control">
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


export default UpdateCategoriesModal;
