import {
    INFO_STUDENT_REQUEST,
    INFO_STUDENT_SUCCESS,
    INFO_STUDENT_FAIL
} from '../../constants/Admin/takeInfoOfStudent';
import axiosClient from '../../../utils/axiosClient';
import axios from 'axios'


export const takeInfoOfStudent = (values) => {
    console.log("Hello!!")
    return (dispatch) => {
        dispatch({ type: INFO_STUDENT_REQUEST });

        axiosClient.get(`QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${values}`)
            .then((result) => {
                console.log("Hi ANH")

                // localStorage.setItem("user", JSON.stringify(result.data));
                console.log("TT");
                dispatch({
                    type: INFO_STUDENT_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                console.log("Hi EM")
                dispatch({
                    type: INFO_STUDENT_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}