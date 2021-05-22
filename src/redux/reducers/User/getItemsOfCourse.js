import {     
    ITEMCOURSE_REQUEST,
    ITEMCOURSE_SUCCESS,
    ITEMCOURSE_FAIL
} from '../../constants/User/getItemsOfCourse';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    itemsCourse: [],
    loading: false,
    error: null,
    
}

const itemOfCourseReducer = (state = initialState, action) => {
    switch (action.type) {
     case ITEMCOURSE_REQUEST :
            return {...state, loading: true, error: null}
        case ITEMCOURSE_SUCCESS :
            return {...state, itemsCourse: action.payload.data, loading: false}
        case ITEMCOURSE_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default itemOfCourseReducer