import {
    UPDATE_COURSES_REQUEST,
    UPDATE_COURSES_SUCCESS,
    UPDATE_COURSES_FAIL
} from '../../constants/Admin/updateCourses';
import axiosClient from '../../../utils/axiosClient';

import { uploadImageCourse} from '../../../redux/actions/Admin/uploadImageCourse';

export const updateCourses = (values) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_COURSES_REQUEST });
        axiosClient.put("QuanLyKhoaHoc/CapNhatKhoaHoc", values)
            .then((result) => {
                dispatch({
                    type: UPDATE_COURSES_SUCCESS,
                    payload: { data: result.data }
                });
                // upload file hinh anh
                if(values.currentFile!==undefined){
                    const dataUpload = {file:values.currentFile,tenKhoaHoc:values.tenKhoaHoc}
                    dispatch(uploadImageCourse(dataUpload));
                }
            }).catch((error) => {
                dispatch({
                    type: UPDATE_COURSES_FAIL,
                    payload: {   error: error.response.data }
                })
            })
    }
}