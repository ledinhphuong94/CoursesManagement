import {LINK_REQUEST} from '../../redux/constants/getLink'

const initialState = {
    linkTab: '',
}
const getLinkReducer = (state = initialState, action) => {
    switch (action.type) {
        case LINK_REQUEST:
            return {...state, linkTab: action.payload}
        default: 
        return state;
    }
}
export default getLinkReducer