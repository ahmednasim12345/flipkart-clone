import axios from "../axios";
import { pageConstant } from "./constants"

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstant.CREATE_PAGE_REQUEST});
     try {
        const res = await axios.post(`/page/create`,form);
        console.log("page response ==>",res);
        if(res.status === 201){
            dispatch({
                type: pageConstant.CREATE_PAGE_SUCCESS,
                payload : { page :res.data.page}
            });
        }else{
           dispatch({
               type: pageConstant.CREATE_PAGE_FAILURE,
               payload: {error : res.data.error}
           })
        }
     } catch (error) {
         console.log(error)
     }
    }
}