const initialState = {
    courseDetail: {},
    loadingCourseDetail: false,
    errorCourseDetail: null
}

const courseDetailReducer = (state = initialState, action ) => {
    switch(action.type) {
        case  'GET_COURSE_DETAIL_REQUEST' : 
            return {...state, loading: true}
        case 'GET_COURSE_DETAIL_SUCCESS' : 
            return {...state, courseDetail: action.payload.data, loading: false}

        case 'GET_COURSE_DETAIL_FAIL' : 
            return {...state, loading: false, error: action.payload.error}

        default:
            return state;
    };

}
export default courseDetailReducer