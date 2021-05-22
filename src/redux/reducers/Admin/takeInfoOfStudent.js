import { INFO_STUDENT_REQUEST, INFO_STUDENT_SUCCESS, INFO_STUDENT_FAIL } from '../../constants/Admin/takeInfoOfStudent';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    currentStudentInfo: {
        lstHocVien: [],
        tenKhoaHoc: ""
    },
    loading: false,
    error: null
}

const getStudentInfoByCourseReducer = (state = initialState, action) => {
    switch (action.type) {
     case INFO_STUDENT_REQUEST :
            return {...state, loading: true, error: null}
        case INFO_STUDENT_SUCCESS :
            return {...state, currentStudentInfo: action.payload.data, loading: false}
        case INFO_STUDENT_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default getStudentInfoByCourseReducer