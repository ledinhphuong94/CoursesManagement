import {
    GET_COURSES_AWAIT_APPROVE_REQUEST, GET_COURSES_AWAIT_APPROVE_SUCCESS, GET_COURSES_AWAIT_APPROVE_FAIL
} from '../../constants/Admin/getCoursesAwaitApprove'
import axiosClient from '../../../utils/axiosClient'
export const getCoursesAwaitApprove = (value, account) => {
    return (dispatch) => {
        dispatch({
            type: GET_COURSES_AWAIT_APPROVE_REQUEST
        });

        axiosClient.post('QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',value).then((result)=> {
            let newArray = [account,...result.data]
            dispatch({
                type: GET_COURSES_AWAIT_APPROVE_SUCCESS,
                payload: {data: newArray}
            })
        }).catch((error)=>{
            console.log("error")
            dispatch({
                type: GET_COURSES_AWAIT_APPROVE_FAIL,
                payload: {error: error?.response?.data}
            })
        })
    }
}
