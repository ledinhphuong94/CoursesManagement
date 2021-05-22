
const initialState = {
    categories: [],
    loading: false,
    error: null
}

const categoriesReducer = (state = initialState, action ) => {
    switch(action.type) {
        case  'GET_CATEGORIES_REQUEST' : 
            return {...state, loading: true}
        case 'GET_CATEGORIES_SUCCESS' : 
            return {...state, categories: action.payload.data, loading: false}
        case 'GET_CATEGORIES_FAIL' : 
            return {...state, loading: false, error: action.payload.error}
        default:
            return state;
    };

}
export default categoriesReducer