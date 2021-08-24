import axios from "../axios";
import { authConstants, cartConstants } from "./constants"

export const login = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });

        // dipatch actions
        const res = await axios.post(`/user/signin`, {
            ...user
        });
        if (res.status === 200) {
            // just take the data from front-end

            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    user,
                    token
                }
            })

        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }

    }
}



export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: "Failed to login" }
            })
        }
    }
}


// Logout actions

export const signout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        localStorage.clear();
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        dispatch({ type: cartConstants.RESET_CART});

        // const res = await axios.post(`/admin/signout`);
        // if (res.status === 200) {
           
        // } else {
        //     dispatch({
        //         type: authConstants.LOGOUT_FAILURE,
        //         payload: { error: res.data.error }
        //     });
        // }


    }
}