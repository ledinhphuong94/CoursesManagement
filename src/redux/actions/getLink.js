import {LINK_REQUEST} from '../../redux/constants/getLink'

export const getLinkTab = (value) => {
    return (dispatch) => {
        dispatch({ 
            type: LINK_REQUEST,
            payload:value 
        });
    }
    
}