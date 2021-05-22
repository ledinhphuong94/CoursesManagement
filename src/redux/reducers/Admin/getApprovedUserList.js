import { DSND_DUOC_DUYET_REQUEST, DSND_DUOC_DUYET_SUCCESS, DSND_DUOC_DUYET_FAIL } from '../../constants/Admin/getApprovedUserList'
const initialState = {
    DSNDDaDangKy: [],
    error2: null,
    loading2: false,
}
const getApprovedUserListReducer = (state = initialState, action) => {
    switch (action.type) {
        case DSND_DUOC_DUYET_REQUEST: 
                    return { ...state, loading2: true }
        case DSND_DUOC_DUYET_SUCCESS: {
            let count1 = 0;
            if (count1 < 1) {
                return { ...state, DSNDDaDangKy: [...state.DSNDDaDangKy, action.payload.data], loading2: false }
            } 
            return {...state}
            
            // else {
            //     if (count2 >= 1) {
            //         return { ...state, DSNDDaDangKy: [...state.DSNDDaDangKy], loading2: false }
            //     } else {
            //         return state
            //     }
            // }

        }
        case DSND_DUOC_DUYET_FAIL: 
            return { ...state, error2: action.payload.error, loading2: false }
        default: return state
    }
}
export default getApprovedUserListReducer;