import {
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAIL,

} from '../../constants/Admin/userList';
import axiosClient from '../../../utils/axiosClient';

export const getUserList = (values) => {
    return (dispatch) => {
        dispatch({ type: GET_USER_LIST_REQUEST });
        axiosClient.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01`)
            .then((result) => {
                dispatch({
                    type: GET_USER_LIST_SUCCESS,
                    payload: { data: result.data }
                });
            }).catch((error) => {
                dispatch({
                    type: GET_USER_LIST_FAIL,
                    payload: { error: error.response.data }
                })
            })
    }
}
