import {
    USERACCOUNT_REQUEST,
    USERACCOUNT_SUCCESS,
    USERACCOUNT_FAIL
} from '../../constants/User/ThongTinTaiKhoan';
import axiosClient from '../../../utils/axiosClient';


export const getUserAcount = (value) => {
    console.log("Hello!!")
    return (dispatch) => {
        dispatch({ type: USERACCOUNT_REQUEST });

        axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan", value)
            .then((result) => {

                // localStorage.setItem("user", JSON.stringtify(result.data));
                console.log("TT");
                dispatch({
                    type: USERACCOUNT_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                console.log("ERROR")
                dispatch({
                    type: USERACCOUNT_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}