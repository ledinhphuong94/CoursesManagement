import {    SINGUP_REQUEST,  SINGUP_SUCCESS,    SINGUP_FAIL } from '../../constants/User/DangKyKhoaHoc';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    courseSignUp: "",
    loading: false,
    error: null
}

const courseSignUpReducer = (state = initialState, action) => {
    switch (action.type) {
     case SINGUP_REQUEST :
            return {...state, loading: true, error: null}
        case SINGUP_SUCCESS :
            return {...state, courseSignUp: action.payload.data, loading: false}
        case SINGUP_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default courseSignUpReducer