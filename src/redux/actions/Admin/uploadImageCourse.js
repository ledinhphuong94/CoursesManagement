import {
    UPLOAD_IMG_COURSE_REQUEST,
    UPLOAD_IMG_COURSE_SUCCESS,
    UPLOAD_IMG_COURSE_FAIL,
} from '../../constants/Admin/uploadCourse';
import axiosClient from '../../../utils/axiosClient';

export const uploadImageCourse = (values) => {
    return (dispatch) => {
        dispatch({ type: UPLOAD_IMG_COURSE_REQUEST });
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        } 
        console.log("VO UPDATE")
        const frm = new FormData()
        frm.append('file',values.file);
        frm.append('tenKhoaHoc',values.tenKhoaHoc);
        axiosClient.post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", frm,config)
            .then((result) => {
                console.log("UPDATE OK")
                dispatch({
                    type: UPLOAD_IMG_COURSE_SUCCESS,
                    payload: { data: result.data }
                });
                console.log(result.data);
            }).catch((error) => {
                console.log("UPDATE FAIL",error.response.data)
                dispatch({
                    type: UPLOAD_IMG_COURSE_FAIL,
                    payload: {error: error.response.data }
                })
            })
    }
}

// export const updateImageCourse = (values) => {
//     return (dispatch) => {
//         dispatch({ type: UPDATE_IMG_COURSE_REQUEST });
//         const config = {     
//             headers: { 'content-type': 'multipart/form-data' }
//         } 
//         console.log("VO UPDATE FILE")
//         const frm = new FormData()
//         frm.append('file',values.file);
//         frm.append('tenKhoaHoc',values.tenKhoaHoc);
//         axiosClient.post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", frm,config)
//             .then((result) => {
//                 console.log("UPDATE OK")
//                 dispatch({
//                     type: UPDATE_IMG_COURSE_SUCCESS,
//                     payload: { data: result.data }
//                 });
//                 console.log(result.data);
//             }).catch((error) => {
//                 console.log("UPDATE FAIL",error.response.data)
//                 dispatch({
//                     type: UPDATE_IMG_COURSE_FAIL,
//                     payload: {error: error.response.data }
//                 })
//             })
//     }
// }