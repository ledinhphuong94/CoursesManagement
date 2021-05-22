import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { dangKyKhoaHoc } from '../../../redux/actions/User/DangKyKhoaHoc';
import { deleteMyCourses } from '../../../redux/actions/User/DeleteCourses'
import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 30,
    },
    background: {
        backgroundColor: '#D8E6F1',
    }
}));

export default function DanhSachKhoaHocTable(props) {
    const dispatch = useDispatch();

    let coursesTable = props.data.map((item, index) => {
        index++
        let demKhoaHocDaDangKy = 0;

        props?.userAccount?.chiTietKhoaHocGhiDanh.map((ite, inde) => {
            if (ite.maKhoaHoc === item.maKhoaHoc) {
                demKhoaHocDaDangKy++
            }
        })

        if (demKhoaHocDaDangKy === 0) {
            return { id: index, ...item, tinhTrangDangKy: false, huyOrDangKy: [false, item.maKhoaHoc] }
        }
        return { id: index, ...item, tinhTrangDangKy: true, huyOrDangKy: [true, item.maKhoaHoc] }
    })
    let [arrayKhoaHoc, setKhoaHoc] = useState(coursesTable)

    const sendData = (value, type) => props.pushDataToParent(value, type);

    const registerFunction = (value, type) => {
        setKhoaHoc(arrayKhoaHoc.map((item,index)=>{
            if(value === item.huyOrDangKy[1]){
                return {...item, tinhTrangDangKy: !item.tinhTrangDangKy, huyOrDangKy: [!item.tinhTrangDangKy,item.maKhoaHoc]}
            }
            return item
        }))

        if (type === "dangKy") {
            dispatch(dangKyKhoaHoc({ maKhoaHoc: value, taiKhoan: props.user.taiKhoan }))
        }
        if (type === "huyDangKy") {
            dispatch(deleteMyCourses({ maKhoaHoc: value, taiKhoan: props.user.taiKhoan }))
        }
        sendData(`${value}${type}`, type)
    }

    const classes = useStyles();
    const rows: GridRowsProp = [...arrayKhoaHoc]
    const columns: GridColDef[] = [
        {
            field: 'hinhAnh', headerName: 'Ảnh', flex: 80, renderCell: (params: GridCellParams) => (
                <img src={params.value} width="40" height="40" />
            )
        },
        {
            field: 'maKhoaHoc', headerName: 'Mã khóa học', flex: 140, renderCell: (params: GridCellParams) => (
                <Link to={`/detail/${params.value}`}>{params.value}</Link>
            )
        },
        { field: 'luotXem', headerName: 'Lượt xem', flex: 120 },
        { field: 'tenKhoaHoc', headerName: 'Tên khóa học', flex: 280 },
        {
            field: 'tinhTrangDangKy', headerName: 'Đã đăng ký', flex: 150, renderCell: (params: GridCellParams) => (
                params.value ? (<DoneOutlineIcon style={{ color: 'green', margin: 'auto' }} />) : (<React.Fragment />)
            )
        },
        {
            field: 'huyOrDangKy', headerName: 'Đăng ký / Hủy đăng ký', flex: 250, renderCell: (params: GridCellParams) => (
                params.value[0] ? (
                    <IconButton aria-label="unregister" size="large" onClick={() => registerFunction(params.value[1], "huyDangKy")} style={{ color: 'red', margin: 'auto' }}>
                        <RemoveCircleIcon />
                    </IconButton>

                ) : (
                    <IconButton aria-label="register" size="large" onClick={() => registerFunction(params.value[1], "dangKy")} style={{ color: 'green', margin: 'auto' }}>
                        <AddCircleIcon />
                    </IconButton>
                )
            )
        },
    ];

    return (
        <Card className={classes.root}>
            <Typography variant="h5" color="primary" gutterBottom align="center">Đăng ký khóa học</Typography>
            <Divider />
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} rowHeight={90} />
            </div>
        </Card>
    )
}
