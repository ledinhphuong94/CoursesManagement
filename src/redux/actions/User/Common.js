import {
    SET_ID_CATEGORY_SELECTED
} from '../../constants/common';

export const setIdCategory = (value) => {
    return (dispatch) => {
        dispatch({
            type: SET_ID_CATEGORY_SELECTED,
            payload: { data: value }
        });

    }
}