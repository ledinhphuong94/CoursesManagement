
import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import {getCourseList} from '../../../redux/actions/useAPICourses'
import {getUserApprovedCourses} from '../../../redux/actions/User/getApprovedCourses'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DanhSachDaDangKy from './DanhSachDaDangKy';
import DanhSachKhoaHocTable from './DanhSachKhoaHocTable'
import DanhSachDuocDuyet from './DanhSachDuocDuyet'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import {getLinkTab} from '../../../redux/actions/getLink'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 30,
    },
    background: {
        backgroundColor: '#D8E6F1',
    },
    head: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
          fontSize: '20px',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ManageYourCourses(props) {
    const [idKhoaHoc, setIDKhoaHoc] = useState('')
    const classes = useStyles();
    const { userAccount } = useSelector((state) => state.userAccountReducer)
    const { courseList } = useSelector((state) => state.courseReducer)
    const { currentUser } = useSelector((state) => state.loginReducer);
    const {courseSignUp,loading} = useSelector(state=>state.courseSignUpReducer)
    const {deleteCourse,loadingDeleteCourse} = useSelector(state=>state.deleteCoursesReducer)
    const {userApprovedCourses,loadingApprovedCourses} = useSelector(state=>state.userApprovedCoursesReducer)
    // Thông báo kết quả
    const [openDangKy, setOpenDangKy] = useState(false);
    const [openHuyDangKy, setHuyOpenDangKy] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourseList());
    },[])

    useEffect(() => {
        dispatch(getUserAcount({ taiKhoan: currentUser.taiKhoan }));  
    },[])
   
    useEffect(() => {
        dispatch(getUserApprovedCourses({ taiKhoan: currentUser.taiKhoan }));  
    },[])

    const getDataFromChild = (id,type) => {
        setIDKhoaHoc(id)    
        if(type === "dangKy"){
            setOpenDangKy(true)
        }      
        if(type === "huyDangKy"){
            setHuyOpenDangKy(true)
        } 
    }   

    useEffect(() => {
        dispatch(getLinkTab(props.match.path))
    }, [])

    // Handle close Thông báo đăng ký/ hủy đăng ký
    const handleCloseDangKy = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenDangKy(false);
    };
    const handleCloseHuyDangKy = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setHuyOpenDangKy(false);
    };

    return (
        <React.Fragment>
            <Typography className={classes.head} variant="h4" color="secondary" align="center" gutterBottom style={{paddingTop:'30px'}}>Quản lý khóa học của bạn</Typography>
            <Grid container className={classes.background}>
                <Grid item xs={12} container justify="space-between">
                    <Grid item xs={12} md={6}>
                        <DanhSachDaDangKy data={userAccount}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DanhSachDuocDuyet data={userApprovedCourses}/>
                    </Grid>
                    
                </Grid>
                <Divider />
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                    <Card className={classes.root}>
                        <DanhSachKhoaHocTable data={courseList} user={currentUser} userAccount={userAccount} pushDataToParent={getDataFromChild}/>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar open={openDangKy} autoHideDuration={2000} onClose={handleCloseDangKy}>
                    <Alert onClose={handleCloseDangKy} severity="success">{courseSignUp}</Alert>
            </Snackbar>
            <Snackbar open={openHuyDangKy} autoHideDuration={2000} onClose={handleCloseHuyDangKy}>
                    <Alert onClose={handleCloseHuyDangKy} severity="error">{deleteCourse}</Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={loading || loadingDeleteCourse || loadingApprovedCourses} >
                    <CircularProgress color="secondary" />
            </Backdrop>
        </React.Fragment>
    )
}
