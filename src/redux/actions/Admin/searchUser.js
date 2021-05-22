import {
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
} from '../../constants/Admin/userList';
import axiosClient from '../../../utils/axiosClient';
import axios from 'axios'


export const searchUser = (taiKhoan) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_USER_REQUEST });
        axiosClient.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01 &tuKhoa=${taiKhoan}`)
            .then((result) => {
                dispatch({
                    type: SEARCH_USER_SUCCESS,
                    payload: { data: result.data[0] }
                });
            }).catch((error) => {
                dispatch({
                    type: SEARCH_USER_FAIL,
                    payload: { error: error.response.data }
                })
            })
    }
}
