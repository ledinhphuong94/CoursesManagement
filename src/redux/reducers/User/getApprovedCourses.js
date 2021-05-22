import {USER_GET_APPROVED_COURSES_REQUEST,USER_GET_APPROVED_COURSES_SUCCESS,USER_GET_APPROVED_COURSES_FAIL} from '../../constants/User/getApprovedCourses'

const initialState = {
    userApprovedCourses: [],
    loadingApprovedCourses: false,
    errorApprovedCourses: null
}

const userApprovedCoursesReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_GET_APPROVED_COURSES_REQUEST:
            return {...state,loadingApprovedCourses:true}
        case USER_GET_APPROVED_COURSES_SUCCESS:
            return {...state,loadingApprovedCourses:false, userApprovedCourses: action.payload.data}
        case USER_GET_APPROVED_COURSES_FAIL:
            return {...state,loadingApprovedCourses:false, errorApprovedCourses:action.payload.error}
        default: return state
    }
}

export default userApprovedCoursesReducer