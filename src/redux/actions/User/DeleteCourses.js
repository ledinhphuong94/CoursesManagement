import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import {
    DELETECOURSE_REQUEST,
    DELETECOURSE_SUCCESS,
    DELETECOURSE_FAIL
} from '../../constants/User/DeleteCourses';
import axiosClient from '../../../utils/axiosClient';


export const deleteMyCourses = (value) => {
    return (dispatch) => {
        dispatch({ type: DELETECOURSE_REQUEST });

        axiosClient.post("QuanLyKhoaHoc/HuyGhiDanh", value)
            .then((result) => {

                // localStorage.setItem("user", JSON.stringtify(result.data));
                console.log("TT");
                dispatch({
                    type: DELETECOURSE_SUCCESS,
                    payload: { data: result.data }
                });
                dispatch(getUserAcount({ taiKhoan: value.taiKhoan }));  
            }).catch((error) => {
                console.log("ERROR")
                dispatch({
                    type: DELETECOURSE_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}