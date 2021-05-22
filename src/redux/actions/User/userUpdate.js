import {
    USERUPDATE_REQUEST,
    USERUPDATE_SUCCESS,
    USERUPDATE_FAIL
} from '../../constants/User/userUpdate';
import axiosClient from '../../../utils/axiosClient';


export const userUpdateInf = (value) => {
    console.log(value);
    return (dispatch) => {
        dispatch({ type: USERUPDATE_REQUEST });

        axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", value)
            .then((result) => {

                // localStorage.setItem("user", JSON.stringtify(result.data));
                console.log("TT");
                dispatch({
                    type: USERUPDATE_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                console.log("ERROR")
                dispatch({
                    type: USERUPDATE_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}