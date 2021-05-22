import {     
    USERACCOUNT_REQUEST,
    USERACCOUNT_SUCCESS,
    USERACCOUNT_FAIL 
} from '../../constants/User/ThongTinTaiKhoan';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    userAccount: {},
    loading: false,
    error: null,
}

const userAccountReducer = (state = initialState, action) => {
    switch (action.type) {
     case USERACCOUNT_REQUEST :
            return {...state, loading: true, error: null}
        case USERACCOUNT_SUCCESS :
            return {...state, userAccount: action.payload.data, loading: false}
        case USERACCOUNT_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default userAccountReducer