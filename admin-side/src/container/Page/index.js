import React, { useEffect, useState } from 'react'
import { Col, Row ,Container} from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CreateCategoriesList from '../../helpers/CreateCategoriesList';
import { useDispatch, useSelector } from 'react-redux'
import { createPage } from '../../actions';



/**
* @author
* @function Page
**/

const Page = (props) => {

    const [title, setTitle] = useState('');
    const [createModal, setCreateModal] = useState(false);
   
    const [type,setType] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [ description ,setDescription] = useState('');
    const [ banners,setBanners] = useState([]);
    const [ products, setProducts] =  useState([]);
    
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const page = useSelector(state => state.page);

//  for category useEffect
    useEffect(() => {
        setCategories(CreateCategoriesList(category.categories));


    }, [category]);
    // console.log("categories ==>",categories);


    // page UseEffect 
  useEffect(() => {
   console.log(" page console",page);
   if(!page.loading){
       setCreateModal(false);
       setTitle('');
       setCategoryId('');
       setDescription('');
       setProducts([]);
       setBanners([])

   }
  },[page]);
    

    const onCategoryChange = (e) => {
        console.log("categories ==>",e.target.value,  categories)
        const category = categories.find(category => category.value == e.target.value);
        console.log("category ===>", category);
        setCategoryId(e.target.value);
        setType(category.type);
    }
 

    // handleBannersImg
    const handleBannersImg = (e) =>{
        console.log(e);
        setBanners([...banners,e.target.files[0]]);
    }

    // handleProductsImg

    const handleProductsImg = (e) => {
        console.log(e);
        setProducts([...products,e.target.files[0]]);
    }
    // onCategoryChange

   
 
    

    // Handle PageForm

    const submitPageForm = () =>{
        const form = new FormData();
        if(title === ""){
            alert('title is required');
            setCreateModal(false);
            return;

        }
        form.append('title',title);
        form.append('description',description);
        form.append('category',categoryId);
        form.append('type',type);
        banners.forEach((banner,index) =>{
            form.append('banners',banner);
        });
        products.forEach((product,index) =>{
            form.append('products',product);
        });

        dispatch(createPage(form))
           setCreateModal(false);
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle="Create New Page"
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
         <Container>
         <Row>
                    <Col>
                        <select
                            value={categoryId}
                            onChange={onCategoryChange}
                            className="form-control form-control-sm">
                            <option>Select Category</option>
                            {
                                categories.map(cat =>
                                    <option key={cat._id} value={cat.value}>{cat.name}</option>)
                            }
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Page Title"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Page Descp"
                        />
                    </Col>
                </Row>
                <Row>
                    {
                      banners.length > 0 ?
                      banners.map((banner,index) =>
                      <Row >
                        <Col key={index}>
                        {banner.name}
                        </Col>  
                      </Row>
                      )  : null
                    }
                 <Col>
                 <Input
                  className="form-control form-control-sm"
                 type="file"
                 name="banners"
                 onChange={handleBannersImg}
                 />
                 </Col>   
                </Row>
                <Row>

                  {
                      products.length > 0 ?
                      products.map((product,index) =>
                      <Row >
                        <Col  key={index}>
                        {product.name}
                        </Col>  
                      </Row>
                      )  : null
                    }      

                 <Col>
                 <Input
                 className="form-control form-control-sm"
                 type="file"
                 name="products"
                 onChange={handleProductsImg}
                 />
                 </Col>   
                </Row>
         </Container>
            </Modal>
        )
    }

    return (
        <Layout sidebar>

            {
                page.loading ?
                <p>Creatitng page ....please wait</p>
                :
                <React.Fragment>
                    {/* renderCreatePage */}
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
       
                </React.Fragment>
            }
            
        </Layout>
    )


}

export default Page