import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from 'formik';
import { yupUserManagerment } from '../../../utils/yupSchema'
import * as Yup from 'yup';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

// Su dung cho Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import MenuItem from '@material-ui/core/MenuItem';
import ConfirmDialog from "../../../views/ConfirmDialog";
import Notification from "../../../views/Notification";
import { Select } from 'material-ui-formik-components/Select'

// Search 
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Controls from "../../../views/controls";

import { getUserList } from '../../../redux/actions/Admin/userList';
// import { searchUser } from '../../../redux/actions/Admin/searchUser';
import { addUser } from '../../../redux/actions/Admin/addUser';
import { deleteUser } from '../../../redux/actions/Admin/deleteUser';
import { userUpdateInf } from '../../../redux/actions/User/userUpdate';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    myInput: {
        height: '10px',
    },
    button: {
        margin: theme.spacing(1),
    },
    // su dung cho table
    // table: {
    //     minWidth: 650,
    //   },
    // su dung cho search
    rootS: {
        padding: '2px 4px',
        marginBottom: '10px',
        paddingLeft: '10px',
        marginTop: '0',
        display: 'flex',
        alignItems: 'center',
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
        height: 28,
        margin: 4,
    },
    headerTitle: {
        color: 'blue',
        textAlign: 'center',
        paddingTop: 10

    }
}));

const dmLoaiND = [
    {
        id: 'HV',
        title: 'Học viên',
    },
    {
        id: 'GV',
        title: 'Giáo vụ',
    },
];

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function UserManagement(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const { userList } = useSelector((state) => state.getUserListReducer);
    const [userListShow, setUserListShow] = useState(userList);
    const userInitial = {
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        soDt: '',
        email: '',
        maLoaiNguoiDung: ''
    }

    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(userInitial);
    const { loading: updateUserLoading, error: updateUserErr } = useSelector((state) => state.userUpdateReducer);
    const { loading: deleteUserLoading, error: deleteUserErr } = useSelector((state) => state.deleteUserReducer);
    const { loading: addUserLoading, error: addUserErr } = useSelector((state) => state.addUserReducer);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [isAddMode, setIsAddMode] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    
    useEffect(() => {
        localStorage.setItem("linkuser", JSON.stringify(props.match.path));
    }, [])
    // load danh sách
    useEffect(() => {
        dispatch(getUserList());
        setUserListShow(userList);
    }, []);

    useEffect(() => {
        setUserListShow(userList);
    }, [userList]);

    // Kiểm tra và hiển thị kết quả thêm mới
    useEffect(() => {
        if(showResult === true && addUserLoading===false)
        {
            if (addUserErr!=null) {
                setNotify({
                    isOpen: true,
                    message: 'Lỗi thêm mới. ' + addUserErr,
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Thêm user thành công!',
                    type: 'success'
                })
                setCurrentUser(userInitial);
                dispatch(getUserList());
            }
            setShowResult(false);
        }
    }, [addUserLoading]);

      // Kiểm tra và hiển thị kết quả cập nhật thông tin
    useEffect(() => {
        if(showResult === true && updateUserLoading===false)
        {
              if (updateUserErr!==null) {
                setNotify({
                    isOpen: true,
                    message: 'Lỗi cập nhật. ' + updateUserErr,
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Đã cập nhật user',
                    type: 'success'
                })
                dispatch(getUserList());
                setOpen(false);
            }
            setShowResult(false);
        }
    }, [updateUserLoading]);

          // Kiểm tra và hiển thị kết quả cập nhật thông tin
    useEffect(() => {
        if(showResult === true && updateUserLoading===false)
        {
              if (updateUserErr!==null) {
                setNotify({
                    isOpen: true,
                    message: 'Lỗi cập nhật. ' + updateUserErr,
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Đã cập nhật user',
                    type: 'success'
                })
                dispatch(getUserList());
                setOpen(false);
            }
            setShowResult(false);
        }
    }, [updateUserLoading]);

    // Kiểm tra và hiển thị kết quả xóa
    useEffect(() => {
        if(showResult === true && deleteUserLoading===false)
        {
            if (deleteUserErr!==null && deleteUserLoading===false) {
                setNotify({
                    isOpen: true,
                    message: deleteUserErr,
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Đã xóa thành công!',
                    type: 'success'
                })
                dispatch(getUserList());
            }
            setShowResult(false);
            }
    }, [deleteUserLoading]);

    // Hàm chọn sửa
    const onClickEdit = (item) => {
        setCurrentUser(item)
        setIsAddMode(false)
        setOpen(true);
    };

    // Hàm xóa
    const onClickDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        dispatch(deleteUser(id))
        setShowResult(true);
    };

// Hàm ghi nhận thêm mới/ cập nhật
    const handleSubmit=(values) => {
        if (isAddMode) {
            dispatch(addUser({ ...values, maNhom: 'GP01' }))
        } else {
            const valueUpdate = { ...values, maNhom: 'GP01' }
            dispatch(userUpdateInf(valueUpdate))
        }
        setCurrentUser({})
        setShowResult(true);
    }

    // const handleChangeLoaiND = (event) => {
    //     setLoaiND(event.target.value);
    // };

    const handleClickOpen = (item) => {
        setOpen(true);
        setIsAddMode(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentUser({})
    };

    const handleSearch = e => {
        if (e.target.value === "")
            setUserListShow(userList);
        else
            setUserListShow(userList.filter(x => x.hoTen.toLowerCase().includes(e.target.value.toLowerCase())));    
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div>
                        <Paper component="form" className={classes.rootS}>
                            <Grid item xs={7}>
                                <Typography variant="h6" noWrap color="primary">
                                    QUẢN LÝ NGƯỜI DÙNG
                        </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.rootS}>
                                <InputBase
                                    className={classes.inputS}
                                    placeholder="Tìm theo tên"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    variant="outlined"
                                    onChange={handleSearch}
                                />
                                {/* <IconButton type="submit" className={classes.iconButtonS} aria-label="search">
                                    <SearchIcon />
                                </IconButton> */}
                                <Divider className={classes.dividerS} orientation="vertical" />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                                    onClick={handleClickOpen}
                                >
                                    Thêm
                            </Button>
                            </Grid>
                        </Paper>
                    </div>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid rows={userListShow} pageSize={10}
                            columns={
                                [
                                    { field: 'id', headerName: 'STT', width: 80, hide: 'true' },
                                    { field: 'taiKhoan', headerName: 'Tài khoản', flex: 0.15 },
                                    { field: 'hoTen', headerName: 'Họ tên', flex: 0.3, },
                                    { field: 'email', headerName: 'Email', flex: 0.3 },
                                    {
                                        field: 'maLoaiNguoiDung',
                                        headerName: 'Mã loại',
                                        // type: 'number',
                                        flex: 0.15,
                                    },
                                    {
                                        field: "thaoTac",
                                        headerName: "Thao tác",
                                        disableClickEventBubbling: true,
                                        sortable: false,
                                        flex: 0.1,
                                        renderCell: (params) => {
                                            return (
                                                <div>
                                                    <IconButton color="primary" aria-label="edit" onClick={() => { onClickEdit(params.row) }}><EditIcon /> </IconButton>
                                                    <IconButton color="secondary" aria-label="delete" 
                                                    // onClick={() => { onClickDelete(params.row.taiKhoan) }}
                                                    onClick={() => {
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: `Xóa tài khoản ${params.row.taiKhoan}?`,
                                                            subTitle: "Xóa sẽ không phục hồi được",
                                                            onConfirm: () => { onClickDelete(params.row.taiKhoan)  }
                                                        })
                                                    }}
                                                    
                                                    ><DeleteIcon /> </IconButton>
                                                </div>
                                            );
                                        }
                                    }
                                ]
                            }
                        />
                    </div>
                </Grid>
            </Grid>
            <Dialog
                // fullWidth={"true"}
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle className={classes.headerTitle}>
                    <div>{isAddMode ? "THÊM TÀI KHOẢN" : "CẬP NHẬT THÔNG TIN TÀI KHOẢN"}</div>
                </DialogTitle>
                <DialogContent>
                    <Formik initialValues={currentUser}
                        validationSchema={yupUserManagerment}
                        onSubmit={(values) => {handleSubmit(values)}}>
                        {(formik) => {
                            const { values, errors, touched, isValid, dirty } = formik;
                            return (
                                <Form className={classes.root}>
                                    {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}

                                    <div>
                                        <Field fullWidth
                                            as={Controls.Input}
                                            label="Tên đăng nhập"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            name="taiKhoan"
                                            value={formik.values.taiKhoan}
                                            //value={currentUser.taiKhoan}
                                            disabled={!isAddMode}
                                        // id="taiKhoan"
                                        // variant="outlined"
                                        // size="small"
                                        // value={currentUser.taiKhoan}
                                        />
                                        {/* <Box color="error.main"><ErrorMessage name="taiKhoan"/></Box> */}

                                        <Box color="error.main">{errors.taiKhoan && touched.taiKhoan ? (
                                            <div>{errors.taiKhoan}</div>
                                        ) : null} </Box>
                                    </div>
                                    <div>
                                        <Field fullWidth
                                            as={Controls.Input}
                                            label="Mật khẩu"
                                            variant="outlined"
                                            value={formik.values.matKhau}
                                            onChange={formik.handleChange}
                                            name="matKhau"
                                            type="password"
                                        />
                                        <Box color="error.main">
                                            {errors.matKhau && touched.matKhau ? (
                                                <div >{errors.matKhau}</div>
                                            ) : null}
                                        </Box>
                                    </div>
                                    <div>
                                        <Field fullWidth
                                            as={Controls.Input}
                                            label="Họ tên"
                                            variant="outlined"
                                            value={formik.values.hoTen}
                                            onChange={formik.handleChange}
                                            name="hoTen"
                                        />
                                        <Box color="error.main">
                                            {errors.hoTen && touched.hoTen ? (
                                                <div >{errors.hoTen}</div>
                                            ) : null}
                                        </Box>
                                    </div>
                                    <div>
                                        <Field fullWidth
                                            name="soDt"
                                            as={Controls.Input}
                                            label="Số ĐT"
                                            variant="outlined"
                                            value={formik.values.soDt}
                                            onChange={formik.handleChange}
                                            size="small"
                                        />
                                        <Box color="error.main">{errors.soDt && touched.soDt ? (
                                            <div>{errors.soDt}</div>
                                        ) : null}</Box>

                                    </div>
                                    <div>
                                        <Field 
                                            required
                                            name="maLoaiNguoiDung"
                                            label="Loại người dùng"
                                            variant="outlined"
                                            value={formik.values.maLoaiNguoiDung}
                                            options={[
                                                { value: 'HV', label: 'Học viên' },
                                                { value: 'GV', label: 'Giáo vụ' },
                                            ]}
                                            component={Select}
                                        />
                                            {/* <label>Loại người dùng</label>
                                            <Field name="maLoaiNguoiDung" as="select" >
                                                <option value=""></option>
                                                <option value="HV">Học viên</option>
                                                <option value="GV">Giáo vụ</option>
                                            </Field> */}
                                            {/* <ErrorMessage name="role" component="div" className="invalid-feedback" /> */}
                                        
                                        <div>
                                            <Box color="error.main">{errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
                                                <div>{errors.maLoaiNguoiDung}</div>
                                            ) : null}</Box>
                                        </div>

                                    </div>

                                    <div>
                                        <Field fullWidth
                                            name="email"
                                            as={Controls.Input}
                                            label="Email"
                                            variant="outlined"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                        <Box color="error.main">{errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}</Box>

                                    </div>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} />
                                        <Grid item xs={3}>
                                            <Button type="submit" variant="contained" color="primary"
                                                disabled={(!dirty && !isAddMode)}
                                            >Lưu</Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button autoFocus onClick={handleClose} variant="outlined">Đóng</Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            );
                        }
                        }
                    </Formik>
                </DialogContent>
            </Dialog>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div >
    )

}
