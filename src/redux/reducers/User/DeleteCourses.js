import {     
    DELETECOURSE_REQUEST,
    DELETECOURSE_SUCCESS,
    DELETECOURSE_FAIL
} from '../../constants/User/DeleteCourses';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    deleteCourse: "",
    loadingDeleteCourse: false,
    errorDeleteCourse: null,
    
}

const deleteCoursesReducer = (state = initialState, action) => {
    switch (action.type) {
     case DELETECOURSE_REQUEST :
            return {...state, loading: true, error: null}

        case DELETECOURSE_SUCCESS :
            return {...state, deleteCourse: action.payload.data, loading: false}

        case DELETECOURSE_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default deleteCoursesReducer