import { KH_DA_DUYET_REQUEST, KH_DA_DUYET_SUCCESS, KH_DA_DUYET_FAIL } from '../../constants/Admin/getApprovedCourses'
import axiosClient from '../../../utils/axiosClient'
export const getApprovedCourses = (value, taikhoan) => {
    return (dispatch) => {
        dispatch({ type: KH_DA_DUYET_REQUEST })
        axiosClient.post('QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet', value).then(result => {
            dispatch({
                type: KH_DA_DUYET_SUCCESS,
                payload: { data: [taikhoan, ...result.data] }
            })
        }).catch(error => {
            dispatch({
                type: KH_DA_DUYET_FAIL,
                payload: { error: error?.response?.data }
            })
        })
    }
}