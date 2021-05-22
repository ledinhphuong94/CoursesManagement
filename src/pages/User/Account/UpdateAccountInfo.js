import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import {userUpdateInf} from '../../../redux/actions/User/userUpdate'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {getLinkTab} from '../../../redux/actions/getLink'
import Backdrop from '@material-ui/core/Backdrop';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    form: {
        backgroundColor: "white",
        padding: "20px 50px 100px 50px",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    titleHeader: {
        paddingTop: "38px",
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

const updateAccountSchema = yup.object({
    hoTen: yup.string().required("Họ tên không được để trống").matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u, "Họ và tên không được có số hoặc ký tự").max(30, "Chỉ được phép tối đa 30 ký tự"),
    soDT: yup.string().required("Số điện thoại không được để trống").matches(/^[0-9]+$/, "Số điện thoại sai định dạng"),
    email: yup.string().required("Email không được để trống").email("Email sai định dạng!"),
    matKhau: yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Mật khẩu phải ít nhất 8 ký tự, có số, chữ thường và chữ in hoa"),
});

export default function UpdateAccountInfo(props) {
    const dispatch = useDispatch()
    const { userAccount} = useSelector((state) => state.userAccountReducer)
    const {  loading } = useSelector((state) => state.userUpdateReducer)
    const { currentUser } = useSelector((state) => state.loginReducer);
    const [reviewPassWord, setReviewPassWord] = useState(false);
    const [confirmPassWord, setConfirmPassWord] = useState(true);
    const [cfPassWord, setCFPassWord] = useState(userAccount.matKhau);
    const [openTB, setOpenTB] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenTB(false)
    };
    const classes = useStyles();
    useEffect(() => {
        dispatch(getUserAcount({ taiKhoan: currentUser.taiKhoan }))
    }, [])
    
    useEffect(() => {
        dispatch(getLinkTab(props.match.path))
    }, [])

    const formik = useFormik({
        initialValues: {
            taiKhoan: userAccount.taiKhoan,
            maNhom: userAccount.maNhom,
            maLoaiNguoiDung: userAccount.maLoaiNguoiDung,
            matKhau: userAccount.matKhau,
            hoTen: userAccount.hoTen,
            soDT: userAccount.soDT,
            email: userAccount.email,
        },
        validationSchema: updateAccountSchema,
        onSubmit: (values) => {  
            if(values.matKhau === cfPassWord){
                setConfirmPassWord(true)
                dispatch(userUpdateInf(values))
                setOpenTB(true)
            }else{
                setConfirmPassWord(false)
            }
        },
        handleChange: (value) => {
            console.log(value)
        }
    });

    const handleClickShowPassword = () => {
        setReviewPassWord(!reviewPassWord);
    };

    return (
        <React.Fragment>
            <Container maxWidth="md">         
                <Typography color="primary" align="center" variant="h4" className={classes.titleHeader}>Cập nhật thông tin tài khoản</Typography>
                <form onSubmit={formik.handleSubmit} gutterBottom className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid className={classes.textField} item xs={12}>
                            <TextField
                                size="medium"
                                fullWidth
                                id="taiKhoan"
                                name="taiKhoan"
                                label="Tài khoản"
                                value={formik.values.taiKhoan}
                                onChange={formik.handleChange}
                                disabled="true"
                            />
                        </Grid>
                        <Grid className={classes.textField} item xs={12}>
                            <TextField
                                size="medium"
                                fullWidth
                                id="hoTen"
                                name="hoTen"
                                label="Họ và tên"
                                value={formik.values.hoTen}
                                onChange={formik.handleChange}
                                error={formik.touched.hoTen && formik.errors.hoTen}
                                helperText={formik.touched.hoTen && formik.errors.hoTen}
                            />
                        </Grid>
                        <Grid className={classes.textField} item xs={12}>
                            <TextField size="medium"
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid className={classes.textField} item xs={12}>
                            <TextField
                                size="medium"
                                fullWidth
                                id="soDT"
                                name="soDT"
                                label="Số điện thoại"
                                value={formik.values.soDT}
                                onChange={formik.handleChange}
                                error={formik.touched.soDT && Boolean(formik.errors.soDT)}
                                helperText={formik.touched.soDT && formik.errors.soDT}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="matKhau">Mật khẩu</InputLabel>
                                <Input
                                    id="matKhau"
                                    type={reviewPassWord ? 'text' : 'password'}
                                    error={formik.touched.matKhau && Boolean(formik.errors.matKhau)}
                                    value={formik.values.matKhau}
                                    onChange={formik.handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword}>
                                                {reviewPassWord ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText id="matKhau-error" style={{color:'red'}}>{formik.touched.matKhau && formik.errors.matKhau}</FormHelperText>
                            </FormControl>
                        </Grid>                                 
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="xacNhanMatKhau">Xác nhận lại mật khẩu</InputLabel>
                                <Input
                                    type="password"
                                    id="xacNhanMatKhau"
                                    name="xacNhanMatKhau"
                                    value={cfPassWord}
                                    onChange={(evt)=>setCFPassWord(evt.target.value)}
                                    error={formik.touched.xacNhanMatKhau && Boolean(formik.errors.xacNhanMatKhau)}
                                />
                            </FormControl>
                            <FormHelperText id="matKhau-error" style={{color:'red'}}>
                                {confirmPassWord?null:(<span>Không trùng mật khẩu</span>)}
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={loading}  size="large" color="secondary" variant="contained" fullWidth type="submit">
                                {loading ? <CircularProgress /> : <Typography>Cập nhật</Typography>}
                            </Button>

                        </Grid>
                    </Grid>
                    <Snackbar open={openTB} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Cập nhật thành công
                        </Alert>
                    </Snackbar>
                </form>
            </Container>
            <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="secondary" />
            </Backdrop>
        </React.Fragment>
    )
}
