import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from '../constants/register';

// const userRegister = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    userRegister: "",
    loading: false,
    error: null
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST :
            return {...state, loading: true, error: null}
        case REGISTER_SUCCESS :
            return {...state, userRegister: action.payload.data, loading: false}
        case REGISTER_FAIL :
             return {...state, loading: false, error: action.payload.error}
        case "REGISTER_CLEAR" :
            return {...state, userRegister: '', loading: false,error: null}
        default: 
        return state;
    }
}
export default registerReducer