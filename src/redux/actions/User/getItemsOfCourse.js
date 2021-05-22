import {
    ITEMCOURSE_REQUEST,
    ITEMCOURSE_SUCCESS,
    ITEMCOURSE_FAIL
} from '../../constants/User/getItemsOfCourse';
import axiosClient from '../../../utils/axiosClient';
import axios from 'axios'


export const getItemsOfCourse = () => {
    console.log("Hello!!")
    return (dispatch) => {
        dispatch({ type: ITEMCOURSE_REQUEST });

        axiosClient.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
            .then((result) => {

                // localStorage.setItem("user", JSON.stringtify(result.data));
                console.log("TT");
                dispatch({
                    type: ITEMCOURSE_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                console.log("ERROR")
                dispatch({
                    type: ITEMCOURSE_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}