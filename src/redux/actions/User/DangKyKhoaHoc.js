import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import {
    SINGUP_REQUEST,
    SINGUP_SUCCESS,
    SINGUP_FAIL
} from '../../constants/User/DangKyKhoaHoc';
import axiosClient from '../../../utils/axiosClient';

export const dangKyKhoaHoc = (value) => {
    console.log("Hello!!")
    return (dispatch) => {
        dispatch({ type: SINGUP_REQUEST });

        axiosClient.post("QuanLyKhoaHoc/DangKyKhoaHoc", value)
            .then((result) => {
                dispatch({
                    type: SINGUP_SUCCESS,
                    payload: { data: result.data }
                });              
                dispatch(getUserAcount({ taiKhoan: value.taiKhoan }));  

                console.log(result.data);
            }).catch((error) => {
                console.log("ERROR")
                dispatch({
                    type: SINGUP_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}