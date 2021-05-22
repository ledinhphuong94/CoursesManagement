import {
    GET_COURSE_ITEM_REQUEST,
    GET_COURSE_ITEM_SUCCESS,
    GET_COURSE_ITEM_FAIL
} from '../constants/courses';

const initialState = {
    courseItem: [],
    loading: false,
    error: null
}

const courseItemReducer = (state = initialState, action ) => {
    switch(action.type) {
        case  GET_COURSE_ITEM_REQUEST : 
            return {...state, loading: true}
        case GET_COURSE_ITEM_SUCCESS : 
            return {...state, courseItem: action.payload.data, loading: false}
        case GET_COURSE_ITEM_FAIL :
            return { ...state, loading: false, error: action.payload.error }
        default:
            return state;
    };
}
export default courseItemReducer