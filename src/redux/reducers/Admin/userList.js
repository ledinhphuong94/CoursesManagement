
import { GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAIL } from '../../constants/Admin/userList';

// const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    userList: [],
    loading: false,
    error: null
}

const getUserListReducer = (state = initialState, action) => {
    switch (action.type) {
     case GET_USER_LIST_REQUEST :
            return {...state, loading: true, error: null}
    case GET_USER_LIST_SUCCESS :{
            let idx=0;
            const newUserList = action.payload.data.map((item)=>{
                idx++
                return ({...item, id: idx})
            })
            return {...state, userList:newUserList , loading: false}
        };
        case GET_USER_LIST_FAIL :
            return {...state, loading: false, error: action.payload.error}
        default: 
        return state;
    }
}

export default getUserListReducer