import { SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL } from '../../constants/Admin/userList';

const initialState = {
    user: [],
    loading: false,
    error: null
}
const searchUserReducer = (state = initialState, action) => {
    switch (action.type) {
     case SEARCH_USER_REQUEST :
            return {...state, loading: true, error: null}
        case SEARCH_USER_SUCCESS :
             return {...state, user: action.payload.data , loading: false}
        case SEARCH_USER_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default searchUserReducer