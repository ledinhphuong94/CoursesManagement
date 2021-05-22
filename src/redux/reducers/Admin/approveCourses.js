import {APPROVE_COURSES_REQUEST,APPROVE_COURSES_SUCCESS,APPROVE_COURSES_FAIL} from '../../constants/Admin/approveCourses'

const initialState = {
    approveStatus: "",
    loading3: false,
    error3: null
}

const approveCoursesReducer = (state = initialState, action) => {
    switch(action.type){
        case APPROVE_COURSES_REQUEST: 
            return {...state,loading3: true, error3: null}

        case APPROVE_COURSES_SUCCESS: 
            return {...state,approveStatus: action.payload.data, loading: false}

        case APPROVE_COURSES_FAIL: 
            return {...state, loading: false, error: action.payload.error}
        default: return state
    }
}

export default approveCoursesReducer