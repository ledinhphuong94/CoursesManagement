import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../../../styles/scss/Layouts/adminTable.scss"
import Box from '@material-ui/core/Box';
import { getApprovedUserList } from '../../../redux/actions/Admin/getApprovedUserList'
import Typography from '@material-ui/core/Typography';
import {getCourseList} from '../../../redux/actions/useAPICourses'

export default function ApprovedCoursesListByCourses() {
    const { courseList, loading, error } = useSelector(state => state.courseReducer)
    const { userList } = useSelector(state => state.getUserListReducer)
    const { DSNDDaDangKy, loading2, error2 } = useSelector(state => state.getApprovedUserListReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if(courseList.length == 0){
            dispatch(getCourseList())
        }}, [])
    
    useEffect(() => {
        courseList.map((item, index) => {
            dispatch(getApprovedUserList({ maKhoaHoc: item.maKhoaHoc }, item.maKhoaHoc))
        })
    }, [courseList,userList])
    // console.log("NSND", DSNDDaDangKy)
    if (loading2) {
        return (
            <div>...loading</div>
        )
    }
    return (
        <div>
            <Box align="center" component="h3">Danh sách học viên đã được duyệt theo mã khóa học nhóm GP01</Box>
            <table id="t01">
                <tr>
                    <th>Mã khóa học</th>
                    <th>Tên khóa học</th>
                    <th>Tổng lượt xem</th>
                    <th>Danh sách học viên</th>
                </tr>
                {DSNDDaDangKy.map((item, index) => {
                    return (
                        <tr>
                            <td className="tenTK">{item[0]}</td>
                            {courseList.map(detailKH => {
                                if (detailKH.maKhoaHoc === item[0]) {
                                    return (
                                        <React.Fragment>
                                            <td>{detailKH.tenKhoaHoc}</td>
                                            <td>{detailKH.luotXem}</td>
                                        </React.Fragment>
                                    )
                                }
                            })}
                            <td>
                                {item.map((ite, ide) => {
                                        if (ide !== 0) {
                                            return (
                                                <tr class="khoaHocChoDuyet">
                                                    <td className="tenKH">Tài khoản:  <Typography color="primary">{ite.taiKhoan}</Typography></td>
                                                    <td className="tenKH">Họ tên: <Typography color="primary">{ite.hoTen}</Typography></td>
                                                    <td className="tenKH">Bí danh:  <Typography color="primary">{ite.biDanh}</Typography></td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </td>
                        </tr>

                    )
                })}
            </table>
        </div>
    )
}
