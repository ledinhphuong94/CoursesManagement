import {
    GET_COURSE_LIST_REQUEST,
    GET_COURSE_LIST_SUCCESS,
    GET_COURSE_LIST_FAIL,

    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,

    GET_COURSE_DETAIL_REQUEST,
    GET_COURSE_DETAIL_SUCCESS,
    GET_COURSE_DETAIL_FAIL

} from '../constants/courses';
import axiosClient from '../../utils/axiosClient';

// LAY DANH SACH KHOA HOC
export const getCourseList = () => {
    return (dispatch) => {
        dispatch({type:  GET_COURSE_LIST_REQUEST});

        axiosClient.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc")
        .then((result) => {
            dispatch({
                type: GET_COURSE_LIST_SUCCESS,
                payload: {data: result.data}
            });

        }).catch((error) => {
            dispatch({
                type: GET_COURSE_LIST_FAIL,
                payload: { error: error?.response?.data }
            })
        })
    }
}

// LAY DANH SACH KHOA HOC
export const getCourseSearch = (value) => {
    return (dispatch) => {
        dispatch({type:  GET_COURSE_LIST_REQUEST});

        axiosClient.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
        .then((result) => {

            if(value!==undefined){
                dispatch({
                    type: GET_COURSE_LIST_SUCCESS,
                    payload: {data: result.data.filter(x => x.tenKhoaHoc.toLowerCase().includes(value.toLowerCase()))}
                });
            }
            else{
                dispatch({
                    type: GET_COURSE_LIST_SUCCESS,
                    payload: {data: result.data}
                });
            }
        }).catch((error) => {
            dispatch({
                type: GET_COURSE_LIST_FAIL,
                payload: { error: error.data.message }
            })
        })
    }
}

// LAY DANH MUC KHOA HOC
export const getCategories = () => {
    return (dispatch) => {
        dispatch({type:  GET_CATEGORIES_REQUEST});

        axiosClient.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
        .then((result) => {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: {data: result.data}
            });
        }).catch((error) => {
            dispatch({
                type: GET_CATEGORIES_FAIL,
                payload: { error: error.data.message }
            })
        })
    }
}

// LAY CHI TIET KHOA HOC
export const getCourseDetail = (value) => {

    return (dispatch) => {
        dispatch({ type: GET_COURSE_DETAIL_REQUEST});
        axiosClient.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${value}`)
        .then((result) => {
            dispatch({
                type: GET_COURSE_DETAIL_SUCCESS,
                payload: {data: result.data}
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_COURSE_DETAIL_FAIL,
                payload: {error: error?.response?.data }
            })
        })
    }
}


