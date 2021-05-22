import {SET_ID_CATEGORY_SELECTED,ID_CATEGORY_SELECTED} from '../../constants/common'

const initialState = {
    categoryItemSelected: ID_CATEGORY_SELECTED 
}
const commonUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID_CATEGORY_SELECTED:
            return {...state, categoryItemSelected: action.payload.data}
        default: 
        return state;
    }
}
export default commonUserReducer