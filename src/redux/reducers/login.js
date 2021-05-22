import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/login';

const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    currentUser: currentUser,
    loading: false,
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
     case LOGIN_REQUEST :
            return {...state, loading: true, error: null};
        case LOGIN_SUCCESS :
            return {...state, currentUser: action.payload.data, loading: false};
        case LOGIN_FAIL :
            return {...state, loading: false, error: action.payload.error} ;
        case 'LOG_OUT' :
            return {...state, currentUser: action.value};
          default: 
        return state;
    }
}
export default loginReducer