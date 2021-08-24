
// get all categories
import axios from "../axios";
import { categoryConstants } from "./constants"

export const getAllCategories = () => {
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


