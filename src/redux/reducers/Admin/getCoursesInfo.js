import { GET_COURSES_INFO_REQUEST, GET_COURSES_INFO_SUCCESS, GET_COURSES_INFO_FAIL } from '../../constants/Admin/getCoursesInfo';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    currentCourseInfo: {
        danhMucKhoaHoc: "",
        nguoiTao: ""
    },
    loading: false,
    error: null
}

const getCourseInfoReducer = (state = initialState, action) => {
    switch (action.type) {
     case GET_COURSES_INFO_REQUEST :
            return {...state, loading: true, error: null}
        case GET_COURSES_INFO_SUCCESS :
            return {...state, currentCourseInfo: action.payload.data, loading: false}
        case GET_COURSES_INFO_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default getCourseInfoReducer