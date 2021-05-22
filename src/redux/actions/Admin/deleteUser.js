import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from '../../constants/Admin/userList';
import axiosClient from '../../../utils/axiosClient';

export const deleteUser = (values) => {
    return (dispatch) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axiosClient.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${values}`)
            .then((result) => {
                dispatch({
                    type: DELETE_USER_SUCCESS,
                    payload: { data: result.data }
                });
            }).catch((error) => {
                dispatch({
                    type: DELETE_USER_FAIL,
                    payload: {   error: error?.response?.data }
                })
               
            })
    }
}