import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../../constants/register';
import axiosClient from '../../../utils/axiosClient';

export const registerIntoServer = (values) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });
        axiosClient.post("QuanLyNguoiDung/DangKy", values).then((result) => {
            // localStorage.getItem("user", JSON.stringify(result.data));
            console.log("Thành công")
            dispatch({
                type: REGISTER_SUCCESS,
                payload: { data: result.data}
            })
            setTimeout(()=>{
                dispatch({type:"REGISTER_CLEAR"})
            }, 5000)
        })
        .catch((error) => {
            console.log("Thất bại");
            dispatch({     
                type: REGISTER_FAIL,
                payload: { error: error.response.data}
            })
        })
    }
}