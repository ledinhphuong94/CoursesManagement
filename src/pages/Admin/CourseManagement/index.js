import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Paper, TableBody, TableRow, TableCell, Table} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import { Search } from "@material-ui/icons";
import CardMedia from '@material-ui/core/CardMedia';
import CourseForm from "./CourseForm";
import Popup from "../../../views/Popup";
import ConfirmDialog from "../../../views/ConfirmDialog";
import Notification from "../../../views/Notification";
import useTable from "../../../views/useTable";
import { getCourseList } from '../../../redux/actions/useAPICourses';
import { addCourses } from '../../../redux/actions/Admin/addCourses';
import { updateCourses } from '../../../redux/actions/Admin/updateCourses';
import { deleteCourse } from '../../../redux/actions/Admin/deleteCourses';
// Search 
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'red',
        padding: '5px',

    },
    button: {
        margin: theme.spacing(1),
    },
    img: {
        width: '35px',
        height: '35px',
        borderRadius: '50%',
    },
    pageContent: {
        margin: theme.spacing(0),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '80%',
        border: '1px solid blue'
    },
    newButton: {
           margin: 0,
    },

   rootS: {
        paddingTop: '6px',
        paddingRight: '10px',
        marginBottom: '20px',
        marginTop: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    inputS: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButtonS: {
        padding: 10,
    },
    dividerS: {
        height: 0,
        margin: 5,
    },
}))
const headCells = [
    { id: 'hinhAnh', label: 'Hình.', disableSorting: true  },
    { id: 'maKhoaHoc', label: 'Mã', disableSorting: true  },
    { id: 'biDanh', label: 'Bí danh' },
    { id: 'tenKhoaHoc', label: 'Tên khóa học' },
    { id: 'tenDanhMucKhoaHoc', label: 'Danh mục' },
    { id: 'soLuongHocVien', label: 'SL học viên' },
    { id: 'luotXem', label: 'Lượt xem' },
    { id: 'thaoTac', label: 'Thao tác' },

    //{ id: 'department', label: 'Department', disableSorting: true },
]

export default function CourseManagement() {

    const classes = useStyles();
    const { courseList } = useSelector((state) => state.courseReducer);
    const {  loading: addCourseLoading, error: addCourseErr } = useSelector((state) => state.addCoursesReducer);
    const {  error: updateCourseErr } = useSelector((state) => state.updateCourseReducer);
    const { delCourse, loading: deleteCourseLoading, error: deleteCourseErr } = useSelector((state) => state.deleteCoursesAdminReducer);
    const { file, loading: uploadImageLoading, error: uploadImageErr } = useSelector((state) => state.upLoadImageCourseReducer);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(courseList, headCells, filterFn);

    const [title, setTitle] = useState('')
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [showResult, setShowResult] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourseList());
    },[]);

    useEffect(() => {
        if(showResult === true && deleteCourseLoading===false)
        {
            if (deleteCourseErr!==null && deleteCourseErr!== undefined) {
                setNotify({
                    isOpen: true,
                    message: deleteCourseErr,
                    type: 'error'
                })
            } else {
                dispatch(getCourseList());
                setNotify({
                    isOpen: true,
                    message: 'Đã xóa xong',
                    type: 'success'
                })
            }
            setShowResult(false);
        }
    },[deleteCourseLoading]);

    // Ham them moi/ sua khoa hoc
    const addOrEdit = (course, resetForm) => {
        if (recordForEdit) {
            // CAP NHAT
            dispatch(updateCourses(course));
            setTimeout(function(){
                if (updateCourseErr!==null && updateCourseErr!== undefined) {
                    setNotify({
                        isOpen: true,
                        message: 'Lỗi cập nhật....',
                        type: 'error'
                    })
                } else {
                        setNotify({
                            isOpen: true,
                            message: 'Đã cập nhật',
                            type: 'success'
                        })
                        setOpenPopup(false);
                        
                        dispatch(getCourseList());
                }
                resetForm()
                setRecordForEdit(null)
              }, 1000);
            
        }
        else {
            dispatch(addCourses(course));
            if (!addCourseLoading) {
                if (addCourseErr !== null && addCourseErr !== undefined) {
                    setNotify({
                        isOpen: true,
                        message: 'Lỗi thêm mới: ' + addCourseErr,
                        type: 'error'
                    })
                } else {
                    dispatch(getCourseList());
                    setNotify({
                        isOpen: true,
                        message: 'Đã thêm khóa học',
                        type: 'success'
                    })
                    resetForm()
                }
            }
            setRecordForEdit(null)
        }
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
// Ham Xoa khoa hoc
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteCourse(id));
        setShowResult(true);
    }

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.tenKhoaHoc.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }
    
    return (
        <>
            <div>
                <Paper component="form" className={classes.rootS}>
                <Divider className={classes.dividerS} orientation="vertical" />
                    <Grid item xs={7}>
                        <Typography variant="h6" noWrap color="primary">
                             QUẢN LÝ KHÓA HỌC
                        </Typography>
                    </Grid>
                    <Grid item xs={5} className={classes.rootS}>
                        <Box border={1} borderColor="primary.main" borderRadius="borderRadius">
                            <InputBase
                                className={classes.inputS}
                                placeholder="Tìm theo tên khóa học"
                                inputProps={{ 'aria-label': 'search google maps', 'backgroundColor': 'blue' }}
                                // variant="outlined"
                                border="{1}"
                                onChange={handleSearch}
                            />
                            <Search color="primary"></Search>
                        </Box>
                        <Divider className={classes.dividerS} orientation="vertical" />

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.newButton}
                            startIcon={<AddIcon />}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); setTitle('THÊM MỚI KHÓA HỌC'); }}
                        >
                            Thêm
                            </Button>
                    </Grid>
                </Paper>
            </div>
            <Paper className={classes.pageContent}>
                <TblContainer>
                <Table size="small" aria-label="a dense table">
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.maKhoaHoc}>
                                {/* <TableCell className={classes.root}><Image src={item.hinhAnh} className={classes.img} /></TableCell> */}
                                <TableCell component="th" width="50px">
                                    <CardMedia
                                        className={classes.img}
                                        image={item.hinhAnh}
                                    />
                                </TableCell>

                                <TableCell width="8%">{item.maKhoaHoc}</TableCell>
                                <TableCell width="26%">{item.biDanh}</TableCell>
                                <TableCell width="32%">{item.tenKhoaHoc}</TableCell>
                                <TableCell width="14%">{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</TableCell>
                                <TableCell width="4%" >{item.soLuongHocVien}</TableCell>
                                <TableCell width="4%">{item.luotXem}</TableCell>

                                <TableCell width="12%">
                                <div>
                                                    <IconButton color="primary" aria-label="edit" onClick={() => { openInPopup(item); setTitle('CẬP NHẬT KHÓA HỌC'); }}><EditIcon /> </IconButton>
                                                    <IconButton color="secondary" aria-label="delete" 
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: `Xóa khóa học ${item.tenKhoaHoc}?`,
                                                            subTitle: "Xóa sẽ không phục hồi được",
                                                            onConfirm: () => { onDelete(item.maKhoaHoc) }
                                                        })
                                                    }}
                                                    ><DeleteIcon /></IconButton>
                                </div>
                                    {/* <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item); setTitle('CẬP NHẬT KHÓA HỌC'); }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton> */}
                                    {/* <IconButton color="primary" aria-label="edit" onClick={() => { openInPopup(item); setTitle('CẬP NHẬT KHÓA HỌC'); }}><EditIcon /> Sửa </IconButton> */}
                                    
                                    {/* <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: `Xóa khóa học ${item.tenKhoaHoc}?`,
                                                subTitle: "Xóa sẽ không phục hồi được",
                                                onConfirm: () => { onDelete(item.maKhoaHoc) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton> */}
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                    </Table>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title={title}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CourseForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />

            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
