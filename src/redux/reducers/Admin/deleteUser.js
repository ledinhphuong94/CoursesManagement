import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL } from '../../constants/Admin/userList';

const initialState = {
    result: "",
    loading: false,
    error: null
}

const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
     case DELETE_USER_REQUEST :
            return {...state, loading: true, error: null}
        case DELETE_USER_SUCCESS :
            return {...state, result: action.payload.data, loading: false}
        case DELETE_USER_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default deleteUserReducer