import React, { useEffect } from 'react'
import './style.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../actions/category.actions';
/**
* @author
* @function 
**/

const MenuHeader = (props) => {

  const dispatch = useDispatch();
  const category = useSelector(state => state.category);

  useEffect(()=>{
    dispatch(getAllCategories())
  },[]);
  
  // renderCategories
  const renderCategories = (categories) => {
  //  / console.log("categories type ==>", categories)
     
 let myCategories = [];
 for(let category of categories){
     myCategories.push(
         <li key={category.name}>
           
          {
            category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
              {console.log("category.type",category.type)}
            {category.name}</a> :
            <span>{category.name}</span>
          }
             
             {category.children.length > 0 ? (<ul>{renderCategories(category.children) }</ul>): null }
         </li>
     )
 }
 return myCategories;
  } 

  return(
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0 ? renderCategories(category.categories) : null }
      </ul>

    </div>
   )

 }

export default MenuHeader;