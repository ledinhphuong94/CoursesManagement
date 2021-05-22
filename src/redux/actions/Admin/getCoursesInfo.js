import {
    GET_COURSES_INFO_REQUEST,
    GET_COURSES_INFO_SUCCESS,
    GET_COURSES_INFO_FAIL
} from '../../constants/Admin/getCoursesInfo';
import axiosClient from '../../../utils/axiosClient';
import axios from 'axios'


export const getCoursesInfo = (values) => {
    console.log("Hello!!")
    return (dispatch) => {
        dispatch({ type: GET_COURSES_INFO_REQUEST });

        axiosClient.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${values}`)
            .then((result) => {
                console.log("Hi ANH")

                // localStorage.setItem("user", JSON.stringify(result.data));
                console.log("TT");
                dispatch({
                    type: GET_COURSES_INFO_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                console.log("Hi EM")
                dispatch({
                    type: GET_COURSES_INFO_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}