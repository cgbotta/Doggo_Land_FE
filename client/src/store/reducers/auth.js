import {authTypes} from "../actions/actionTypes"
import {adminTypes} from "../actions/actionTypes"
import API from "../../axios-instance";
const initialState = {
    user: {},
    loading: false,
    error: null,
    loggedIn: false,
    messages: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case authTypes.LOGIN_START:
        return{
            ...state,
            loading: true,
            error: null
    }
    case authTypes.LOGIN_SUCCESS:
        API.defaults.headers.common["Authorization"] = payload.token;
        localStorage.setItem('authToken', payload.token)
        localStorage.setItem('user', JSON.stringify(payload))
        return{
            ...state,
            user: payload,
            loggedIn: true,
            loading: false,
            error: null
    }
    case authTypes.LOGIN_FAIL:
        return{
            ...state,
            loading: false,
            error: payload,
            loggedIn: false,
    }
    case authTypes.REGISTER_START:
        return{
            ...state,
            loading: true,
            error: null
    }
    case authTypes.REGISTER_SUCCESS:
        return{
            ...state,
            user: payload,
            loading: false,
            error: null
    }
    case authTypes.REGISTER_FAIL:
        return{
            ...state,
            loading: false,
            error: payload
    }
    case adminTypes.GET_NOTIFICATION_START:
        return{
            ...state,
            loading: true,
            error: null
        }
    case adminTypes.GET_NOTIFICATION_START:
            return{
                ...state,
                loading: false,
                messages: payload,
                error: null
        }
    case adminTypes.GET_NOTIFICATION_START:
        return{
            ...state,
            loading: false,
            error: payload
    }   
   
    default:
        return state
    }
}