
// get all categories
import axios from "../axios";
import { categoryConstants } from "./constants"

const getAllCategories = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });

        const res = await axios.get(`/category/get-category`);
        console.log("res==>", res);

        const { categoryList } = res.data;
        if (res.status === 200) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })


        } else {
            if (res.status === 400) {
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }

    }



}


// Add category of Products

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({
            type: categoryConstants.ADD_CATEGORTY_REQUEST
        });

        try {
            // connect with api
            const res = await axios.post(`/category/addCategory`, form);
            console.log(" form response", res);

            if (res.status === 201) {

                dispatch({
                    type: categoryConstants.ADD_CATEGORTY_SUCCESS,
                    payload: {
                        category: res.data.category
                    }

                })
            } else {


                dispatch({
                    type: categoryConstants.ADD_CATEGORTY_FAILURE,
                    payload:
                        res.data.error
                })

            }

        } catch (error) {

        }



    }
}

//  update categories

export const updatedCategories = (form) => {
    return async dispatch => {

        dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_REQUEST
        });

        // connect with api
        const res = await axios.post(`/category/update`, form);

        if (res.status === 201) {
            // in succcess we are getting all the categories()
           dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_SUCCESS
           });
            dispatch(getAllCategories());

            return true;
        } else {

            const {error} =  res.data;
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {
                    error
                }
            });
    
        }
    }
}

//  delete categories

export const deleteCategoriesAction = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST});

        // connect with api
        const res = await axios.post(`/category/delete`, {
            payload: {
                ids
            }
        });
        if (res.status === 201) {
            dispatch(getAllCategories());
         dispatch({type: categoryConstants.DELETE_CATEGORIES_SUCCESS }); 
        } else {
           const {error} = res.data;
           dispatch({
               type: categoryConstants.DELETE_CATEGORIES_FAILURE,
               payload:{ error}
           })
        }
    }
}

export {
    getAllCategories
}