import {
    ADD_COURSES_REQUEST,
    ADD_COURSES_SUCCESS,
    ADD_COURSES_FAIL
} from '../../constants/Admin/addCourses';
import axiosClient from '../../../utils/axiosClient';

import { uploadImageCourse} from '../../../redux/actions/Admin/uploadImageCourse';

export const addCourses = (values) => {
    return (dispatch) => {
        dispatch({ type: ADD_COURSES_REQUEST });

        axiosClient.post("QuanLyKhoaHoc/ThemKhoaHoc", values)
            .then((result) => {
               
                dispatch({
                    type: ADD_COURSES_SUCCESS,
                    payload: { data: result.data }
                });
                // upload file hinh anh
                if(values.currentFile){
                    const dataUpload = {file:values.currentFile,tenKhoaHoc:values.tenKhoaHoc}
                    dispatch(uploadImageCourse(dataUpload));
                }


            }).catch((error) => {
                dispatch({
                    type: ADD_COURSES_FAIL,
                    payload: { error: error?.response?.data }
                })
            })
    }
}