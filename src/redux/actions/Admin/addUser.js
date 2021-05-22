import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL
} from '../../constants/Admin/userList';
import axiosClient from '../../../utils/axiosClient';
export const addUser = (values) => {
        return (dispatch) => {
        dispatch({ type: ADD_USER_REQUEST });
        axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", values)
            .then((result) => {
                dispatch({
                    type: ADD_USER_SUCCESS,
                    payload: { data: result.data,error:null,loading: false }
                });
               
            }).catch((error) => {
                dispatch({
                    type: ADD_USER_FAIL,
                    payload: { error: error?.response?.data }
                })
            })
    }
}