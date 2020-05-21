
import * as ACTIONS from './Constants'
import { signin, signup } from '../../api/apiCalls'

export const logoutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    }
}

export const loginSuccess = (authData) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authData
    }
}

export const updateSuccess = ({displayName, image}) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload:{
            displayName,
            image
        }
    }
}

export const loginHandler = (credentials) => {
    return async function (dispatch) {
        const response = await signin(credentials);
        const authState = {
            ...response.data,
            password: credentials.password
        }
        dispatch(loginSuccess(authState));
        return response;
    }
}

export const signupHandler = (user) => {
    return async function (dispatch) {
        const response = await signup(user);
        await dispatch(loginHandler(user));
        return response;
    }
}