import {
    UPLOAD_IMG_COURSE_REQUEST,
    UPLOAD_IMG_COURSE_SUCCESS,
    UPLOAD_IMG_COURSE_FAIL
} from '../../constants/Admin/uploadCourse';
const initialState = {
    file: null,
    loading: false,
    error: null
}

const upLoadImageCourseReducer = (state = initialState, action) => {
    switch (action.type) {
     case UPLOAD_IMG_COURSE_REQUEST :
            return {...state, loading: true, error: null}
        case UPLOAD_IMG_COURSE_SUCCESS :
            return {...state, file: action.payload.data, loading: false}

        case UPLOAD_IMG_COURSE_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default upLoadImageCourseReducer