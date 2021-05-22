import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL } from '../../constants/Admin/userList';

const initialState = {
    currentUser: "",
    loading: false,
    error: null
}

const addUserReducer = (state = initialState, action) => {
    switch (action.type) {
     case ADD_USER_REQUEST :
            return {...state, loading: true, error: null}
        case ADD_USER_SUCCESS :
            return {...state, currentUser: action.payload.data, loading: false, error: null}
        case ADD_USER_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}
export default addUserReducer