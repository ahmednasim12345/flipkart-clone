// SIGNUP ACTIONS

import axios from "../axios";
import { registerConstants } from "./constants";

export const registeration = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: registerConstants.REGISTER_REQUEST });

        // dipatch actions
        const res = await axios.post(`/admin/signup`, {
            ...user
        });
        if (res.status === 201) {
            // just take the data from front-end

            const { message } = res.data;

            dispatch({
                type: registerConstants.REGISTER_SUCCESS,
                payload: {
                    message
                }
            })

        } else {
            if (res.status === 400) {
                dispatch({
                    type: registerConstants.REGISTER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }

    }
}

