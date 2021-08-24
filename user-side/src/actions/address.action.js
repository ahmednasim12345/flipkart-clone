import axios from "../axios";
import { cartConstants, userConstansts } from "./constants";

export const getAddress = () => {
    return async dispatch => {
        try {
            dispatch({ type: userConstansts.GET_USER_ADDRESS_REQUEST });
            console.log("getting address action res ====>",)
            const res = await axios.post(`/user/getAddress`);


            if (res.status === 200) {
                const{ userAddress: {address},} = res.data;
                dispatch({
                    type: userConstansts.GET_USER_ADDRESS_SUCEESS,
                    payload: { address }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstansts.GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
}



export const addAddress = (payload) => {
    return async dispatch => {
        try {
            const res = await axios.post(`/user/address/create`, { payload });
            dispatch({ type: userConstansts.ADD_USER_ADDRESS_REQUEST });
            if (res.status === 201) {
                console.log(res);
                const {address: {address},} = res.data;
                dispatch({
                    type: userConstansts.ADD_USER_ADDRESS_SUCEESS,
                    payload: { address }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstansts.ADD_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async dispatch => {
        try {
            const res = await axios.post(`/user/order/addOrder`, { ...payload });
            dispatch({ type: userConstansts.ADD_USER_ORDER_ADDRESS_REQUEST });
            if (res.status === 201) {
                console.log(res);
                dispatch({
                    type: cartConstants.RESET_CART
                })
                // const {address: {address},} = res.data;
                // dispatch({
                //     type: userConstansts.ADD_USER_ORDER_ADDRESS_SUCEESS,
                //     payload: { address }
                // });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstansts.ADD_USER_ORDER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrder = () => {
    return async dispatch => {
        try {
            const res = await axios.get(`/user/order/getOrders`);
            dispatch({ type: userConstansts.GET_USER_ORDER_ADDRESS_REQUEST });
            if (res.status === 200) {
                console.log(res);
                const {orders} = res.data;
                dispatch({
                    type: userConstansts.GET_USER_ORDER_ADDRESS_SUCEESS,
                    payload: {orders}
                })
                
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstansts.GET_USER_ORDER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
}