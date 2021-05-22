import {APPROVE_COURSES_REQUEST,APPROVE_COURSES_SUCCESS,APPROVE_COURSES_FAIL} from '../../constants/Admin/approveCourses'
import axiosClient from '../../../utils/axiosClient'
export const approveCourses = (value) => {
    return (dispatch) => {
        dispatch({type: APPROVE_COURSES_REQUEST})

        axiosClient.post('QuanLyKhoaHoc/GhiDanhKhoaHoc',value).then((result)=> {
            console.log("success", result.data)
            dispatch({
                type:APPROVE_COURSES_SUCCESS,
                payload:{data:result.data}
            })
        }).catch((error)=>{
            console.log("error", error.response.data)
            dispatch({
                type: APPROVE_COURSES_FAIL,
                payload:{error: error.response.data}
            })
        })

    }
}