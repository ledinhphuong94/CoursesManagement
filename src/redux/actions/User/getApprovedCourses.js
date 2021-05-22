import {USER_GET_APPROVED_COURSES_REQUEST,USER_GET_APPROVED_COURSES_SUCCESS,USER_GET_APPROVED_COURSES_FAIL} from '../../constants/User/getApprovedCourses'

import axiosClient from '../../../utils/axiosClient'

export const getUserApprovedCourses = (values) => {
    return (dispatch) => {
        dispatch({type:USER_GET_APPROVED_COURSES_REQUEST})
        axiosClient.post('QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',values).then((result)=>{
            dispatch({
                type:USER_GET_APPROVED_COURSES_SUCCESS,
                payload:{data:result.data}
            })
        }).catch((error)=>{
            dispatch({
                type:USER_GET_APPROVED_COURSES_FAIL,
                payload:{error:error?.response?.data}
            })
        })
    }
}