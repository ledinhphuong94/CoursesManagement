import {
    DELETE_COURSES_REQUEST,
    DELETE_COURSES_SUCCESS,
    DELETE_COURSES_FAIL
} from '../../constants/Admin/deleteCourses';
import axiosClient from '../../../utils/axiosClient';



export const deleteCourse = (values) => {
    return (dispatch) => {
        dispatch({ type: DELETE_COURSES_REQUEST });

        axiosClient.delete(`QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${values}`)
            .then((result) => {
                dispatch({
                    type: DELETE_COURSES_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                dispatch({
                    type: DELETE_COURSES_FAIL,
                    payload: {   error: error?.response?.data }
                })
            })
    }
}