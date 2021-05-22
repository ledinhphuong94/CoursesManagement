import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerIntoServer } from '../../../redux/actions/User/register'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const SignupSchema = yup.object().shape({
    taiKhoan: yup.string()
        .min(2, 'Quá ngắn')
        .max(50, 'Quá dài!')
        .required('Không được để trống'),
    matKhau: yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Mật khẩu phải ít nhất 8 ký tự, có số, chữ thường và chữ in hoa"),
    email: yup.string().email('Email sai định dạng!').required('Không được để trống'),
    // hoTen: yup.string().required("Họ tên không được để trống").matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u, "Họ và tên không được có số hoặc ký tự").max(30, "Chỉ được phép tối đa 30 ký tự"),
    hoTen: yup.string().required("Họ tên không được để trống").max(30, "Chỉ được phép tối đa 30 ký tự"),
    soDT: yup.string().required("Số điện thoại không được để trống").matches(/^[0-9]+$/, "Số điện thoại sai định dạng"),
    maNhom: yup.string().required('Chọn mã nhóm!'),
});


export default function RegisterUser() {
    const classes = useStyles();
    const { userRegister, loading, error } = useSelector(state => state.registerReducer);
    const dispatch = useDispatch();
    let history = useHistory();

    console.log(userRegister)
    if (userRegister) {
        setTimeout(() => {
            history.replace("/login");
        }, 5000)
        return (
            <React.Fragment>
                <Container maxWidth="md">
                    <Box mt={15}>
                        <Typography align="center" variant="h5" color="primary">
                            Chào mừng <b>{userRegister.taiKhoan}</b>, bạn đã đăng ký thành công!
                        </Typography>
                        <Typography align="center" variant="body1" color="primary" component="p">
                            Đang về trang đăng nhập...
                        </Typography>
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
    return (
        <div className="container-fluid register_form">
            <div className="d-flex justify-content-center">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="./img/logo2.png" width="120px" className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <Formik
                            initialValues={{
                                taiKhoan: '',
                                matKhau: '',
                                hoTen: '',
                                soDT: '',
                                maNhom: '',
                                email: '',
                            }}

                            validationSchema={SignupSchema}

                            onSubmit={(values) => {
                                console.log(values)
                                dispatch(registerIntoServer(values));
                            }}

                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <Field type="text" name="taiKhoan" className="form-control input_user" placeholder="Tên đăng nhập" />
                                        <Box px={1} style={{ width: '100%', color:'blue' }}><ErrorMessage name="taiKhoan" /></Box>
                                    </div>
                                    <div className="input-group mb-2">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <Field type="password" name="matKhau" className="form-control input_pass" placeholder="Mật khẩu" />
                                        <Box style={{ width: '100%', color:'blue' }} px={1}><ErrorMessage name="matKhau" /></Box>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <Field type="text" name="hoTen" className="form-control input_user" placeholder="Họ tên" />
                                        <Box style={{ width: '100%', color:'blue' }} px={1}><ErrorMessage name="hoTen" /></Box>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <Field type="eamil" name="email" className="form-control input_user" placeholder="Email" />
                                        <Box style={{ width: '100%', color:'blue' }} px={1}><ErrorMessage name="email" /></Box>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <Field type="text" name="soDT" className="form-control input_user" placeholder="Số ĐT" />
                                        <Box style={{ width: '100%', color:'blue' }} px={1}><ErrorMessage name="soDT" /></Box>
                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>

                                        <Field component="select" className="form-control input_user" name="maNhom" id="" >
                                            <option value="">---Mã nhóm----</option>
                                            <option value="GP01">GP01</option>
                                            <option value="GP02">GP02</option>
                                        </Field>
                                        <Box style={{ width: '100%', color:'blue' }} px={1}><ErrorMessage name="maNhom" /></Box>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                            <label className="custom-control-label" htmlFor="customControlInline">Nhớ tài khoản</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button type="submit" name="button" disabled={loading} className="btn login_btn" >Đăng ký</button>
                                    </div>
                                    {error ? <div className="alert alert-danger">{error}</div> : null}
                                </Form>
                            )}
                        </Formik>

                    </div>
                    <div className="mt-4">
                        <div className="d-flex justify-content-center links" style={{ paddingBottom: '50px' }}>
                            Bạn đã có tài khoản? <Link to="/login" className="ml-2">Đăng nhập</Link>
                        </div>

                    </div>
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="secondary" />
            </Backdrop>
        </div>

    )
}
