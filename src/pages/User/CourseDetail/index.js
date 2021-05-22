import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetail } from '../../../redux/actions/useAPICourses';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { dangKyKhoaHoc } from '../../../redux/actions/User/DangKyKhoaHoc';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%',
        maxWidth: 500,
        color: 'blue',
        margin: 'auto'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))
export default function CourseDetail(props) {
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [openThongBao, setOpenThongBao] = useState(false);
    const classes = useStyles()
    const { currentUser } = useSelector((state) => state.loginReducer);
    const { courseDetail, loadingCourseDetail} = useSelector(state => state.courseDetailReducer);
    const {courseSignUp,loading,error} = useSelector(state=>state.courseSignUpReducer)
    let history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourseDetail(props.match.params.courseID))
    }, [])

    const handleConfirm = () => {
        setOpenConfirm(false);
        dispatch(dangKyKhoaHoc({ maKhoaHoc: courseDetail.maKhoaHoc, taiKhoan: currentUser.taiKhoan }))
        setOpenThongBao(true)
    };

    const handleCloseDangKy = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenThongBao(false);
    };

    const handleClickOpen = () => {
        if(currentUser){
            setOpenConfirm(true);
        }else{
            history.push("/login");
        }
        
    };

    const handleClose = () => {
        setOpenConfirm(false);
    };

    if(courseDetail.maKhoaHoc===null || courseDetail.maKhoaHoc===undefined)
    return (
        <Container maxWidth="sm">
            <Box my={3}>
            <Typography variant="h4" align="center" gutterBottom color="primary">
                Khóa học chưa cập nhật thông tin đầy đủ.
            </Typography>
            </Box>
         </Container >
    )
    else{
    return (
        <Container maxWidth="sm">
            <Box my={3}>
                <div key={courseDetail.maKhoaHoc}>
                    <Typography variant="h4" align="center" gutterBottom color="primary">
                        {courseDetail.tenKhoaHoc}
                    </Typography>
                    <Typography variant="body1" align="right" gutterBottom color="main">
                        Mã khóa học: <b>{courseDetail.maKhoaHoc}</b>
                    </Typography>
                    <img src={courseDetail.hinhAnh} alt="" style={{ width: '100%', maxHeight: "450px" }} />
                    <Box mt={3}>
                        <Typography variant="body1" gutterBottom>{courseDetail.moTa}</Typography>
                    </Box>
                    <p><b>Lượt xem: </b>{courseDetail.luotXem} </p>
                    <span><b>Giảng viên: </b>{courseDetail?.nguoiTao?.hoTen}</span>
                </div>
            </Box>
            <Box align="right" pb={5}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<MenuBookIcon />}
                    onClick={handleClickOpen}
                >
                    Đăng ký khóa học
                </Button>
            </Box>
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-register-title"
                aria-describedby="alert-register-description"
            >
                <DialogTitle id="alert-register-title">Xác nhận đăng ký khóa học ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-register-description">
                        <Typography component="p">Tên khóa học:
                            <Typography color="primary" component="b">{courseDetail.tenKhoaHoc}</Typography>
                        </Typography>
                        <Typography component="p">Mã khóa học:
                            <Typography color="primary" component="b">{courseDetail.maKhoaHoc}</Typography>
                        </Typography>
                        <Typography component="p">Lượt xem:
                            <Typography color="primary" component="b">{courseDetail.luotXem}</Typography>
                        </Typography>
                        <Typography component="p">Giảng viên:
                            <Typography color="primary" component="b">{courseDetail?.nguoiTao?.hoTen}</Typography>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openThongBao} autoHideDuration={3000} onClose={handleCloseDangKy}>
                    <Alert severity={error?"error":"success"} onClose={handleCloseDangKy}>{error?error:courseSignUp}</Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={loading || loadingCourseDetail} >
                    <CircularProgress color="secondary" />
            </Backdrop>
        </Container >
    )
}

}
