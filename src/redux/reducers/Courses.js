import {
    GET_COURSE_LIST_REQUEST,
    GET_COURSE_LIST_SUCCESS,
    GET_COURSE_LIST_FAIL
} from '../constants/courses';

const initialState = {
    courseList: [],
    loading: false,
    error: null
}

const courseReducer = (state = initialState, action ) => {
    switch(action.type) {
        case GET_COURSE_LIST_REQUEST :
            return {...state, loading: true}
        case GET_COURSE_LIST_SUCCESS : 
            return {...state, courseList: action.payload.data, loading: false}
        case GET_COURSE_LIST_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default:
            return state;
    };
}
export default courseReducer