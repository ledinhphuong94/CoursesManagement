import {DSND_DUOC_DUYET_REQUEST,DSND_DUOC_DUYET_SUCCESS,DSND_DUOC_DUYET_FAIL} from '../../constants/Admin/getApprovedUserList'
import axiosClient from '../../../utils/axiosClient'
export const getApprovedUserList = (value,maKhoaHoc) => {
    return (dispatch) => {
        dispatch({type:DSND_DUOC_DUYET_REQUEST})
        axiosClient.post('QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',value).then(result=>{
            dispatch({
                type: DSND_DUOC_DUYET_SUCCESS,
                payload:{data:[maKhoaHoc,...result.data]}
            })
        }).catch(error=>{
            dispatch({
                type:DSND_DUOC_DUYET_FAIL,
                payload:{error:error?.response?.data}
            })
        })
    }
}