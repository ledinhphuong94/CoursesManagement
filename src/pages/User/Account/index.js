import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DanhSachDaDangKy from '../ManageYourCourses/DanhSachDaDangKy';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import {getLinkTab} from '../../../redux/actions/getLink'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 30,
    },
    background: {
        backgroundColor: '#D8E6F1',
    },
    button: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    padding:'20px'
};

export default function Account(props) {
    const classes = useStyles();
    const { userAccount, loading } = useSelector((state) => state.userAccountReducer)
    const { currentUser } = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserAcount({ taiKhoan: currentUser.taiKhoan }))
    }, [])

    useEffect(() => {
        dispatch(getLinkTab(props.match.path))
    }, [])
    
    return (
        <React.Fragment>
            <Grid container className={classes.background}>
                <Grid item xs={12}>
                    <Card className={classes.root}>
                        <Grid container justify="space-between">
                            <Grid item xs={12} md={4}>
                                <Box borderColor="primary" border={1} {...defaultProps}>
                                    <Typography variant="h5" color="primary" gutterBottom>Cài đặt tài khoản</Typography>
                                    <Divider />
                                    <Typography variant="subtitle1" color="dark">Tài khoản #: {userAccount.taiKhoan}</Typography>
                                    <Typography variant="subtitle1" color="dark" >Họ và tên: {userAccount.hoTen}</Typography>
                                    <Typography variant="subtitle1" color="dark" >Email: {userAccount.email}</Typography>
                                    <Typography variant="subtitle1" color="dark" >Loại tài khoản: {userAccount.maLoaiNguoiDung}</Typography>
                                    <Typography variant="subtitle1" color="dark" >Số điện thoại: {userAccount.soDT}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    component={Link}
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<SettingsIcon />}
                                    align="right"
                                    to="account/update-account"
                                >
                                    Cập nhật tài khoản
                                </Button>
                            </Grid>
                        </Grid>

                    </Card>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                    <DanhSachDaDangKy data={userAccount} />
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="secondary" />
            </Backdrop>
        </React.Fragment>
    )
}
