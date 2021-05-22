
import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginIntoServer } from '../../../redux/actions/User/login'
import { Redirect,useHistory} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { yupLogin } from '../../../utils/yupSchema'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

import Controls from "../../../views/controls";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                Steven
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(img/cover.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    let history = useHistory();
    const classes = useStyles();
    const { currentUser, error } = useSelector((state) => state.loginReducer);
    const dispatch = useDispatch();

    const [taiKhoan, setTaiKhoan] = useState("");
    const [matKhau, setMatKhau] = useState("");

    const user = {
        taiKhoan: taiKhoan,
        matKhau: matKhau,
    }
    if (currentUser) {
        history.goBack();
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Formik
                        initialValues={{
                            taiKhoan: "",
                            matKhau: "",
                        }}
                        validationSchema={yupLogin}
                        onSubmit={(values) => {
                            dispatch(loginIntoServer(values));
                        }}
                    >

                        {(formik) => {

                            const { values, errors, touched } = formik;
                            
                            return (
                                <Form className={classes.form} >
                                    <div className={classes.form} >
                                        <Field fullWidth
                                            as={Controls.Input}
                                            label="Tên đăng nhập"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            name="taiKhoan"
                                            value={formik.values.taiKhoan}
                                        />
                                        <Box color="error.main">{errors.taiKhoan && touched.taiKhoan ? (
                                            <div>{errors.taiKhoan}</div>
                                        ) : null} </Box>
                                    </div>
                                    <div className={classes.form} >
                                        <Field fullWidth
                                            as={Controls.Input}
                                            label="Mật khẩu"
                                            variant="outlined"
                                            onChange={formik.handleChange}
                                            name="matKhau"
                                            type="password"
                                            value={formik.values.matKhau}
                                        />
                                        <Box color="error.main">{errors.matKhau && touched.matKhau ? (
                                            <div>{errors.matKhau}</div>
                                        ) : null} </Box>
                                    </div>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Đăng nhập
                                    </Button>
                                    {error ? (
                                        <Box color="error.main">
                                            <div>{error}</div>
                                            <br></br>
                                        </Box>
                                        
                                    ) : null}
                                    <Grid container>
                                        <Grid item>
                                            <Link to="/reg-user" variant="body2">
                                                <p>Chưa có tài khoản? Đăng ký</p>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Box mt={5}>
                                        <Copyright />
                                    </Box>
                                </Form>
                            );
                        }
                        }
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
}


