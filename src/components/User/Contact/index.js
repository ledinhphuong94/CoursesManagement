import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const selectGioiTinh = [
    { value: 'nam', label: 'Nam' },
    { value: 'nu', label: 'Nữ' },
    { value: 'khac', label: 'Khác' },
];
const contactSchema = yup.object({
    hoTen: yup.string().required("Họ tên không được để trống"),
    soDienThoai: yup.string().required("Số điện thoại không được để trống").matches(/^[0-9]+$/, "Số điện thoại sai định dạng"),
    email: yup.string().required("Email không được để trống").email("Email sai định dạng!"),
    tieuDe: yup.string().required("Tiêu đề không được để trống"),
    noiDung: yup.string().required("Nội dung không được để trống"),
    gioiTinh: yup.mixed().oneOf(['nam', 'nu', 'khac'], "Vui lòng chọn giới tính")
});
const useStyles = makeStyles((theme) => ({
    form: {
        backgroundColor: "white",
        padding: "50px 50px 100px 50px", 
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    titleHeader:{
        padding:"16px",
        color: "#992337",
        fontWeight:"bold"
    }
}));
export default function Contact() {
    const [isSubmited, setSubmit] = useState({ loading: false, loadSuccess: false })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSubmit({ loading: false, loadSuccess: false });
    };
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            hoTen: "",
            soDienThoai: "",
            email: "",
            gioiTinh: [],
            tieuDe: "",
            noiDung: ""
        },
        validationSchema: contactSchema,
        onSubmit: (values) => {
            console.log(values)
            // Fake loading API 
            setSubmit({ loading: true, loadSuccess: false })
            setTimeout(() => setSubmit({ loading: false, loadSuccess: true }), 3000)
        },
    });

    return (
        <Box id="contact" p={6} className={classes.box} style={{ backgroundImage: "linear-gradient(to right,#EC5252,#6E1A52)" }}>
            <Container maxWidth="md" className={classes.form}>
                <Typography className={`${classes.titleHeader} titleHeader`} variant="h5" align="center" >
                    LIÊN HỆ TƯ VẤN
                </Typography>    
                <Typography className="titleHeader" variant="h6" align="center">Đừng ngần ngại liên hệ với chúng tôi nhé</Typography>
                <form onSubmit={formik.handleSubmit} gutterBottom>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <TextField select fullWidth id="gioiTinh" name="gioiTinh" label="Giới tính" value={formik.values.gioiTinh} onChange={formik.handleChange} error={formik.touched.gioiTinh && Boolean(formik.errors.gioiTinh)} helperText={formik.touched.gioiTinh && formik.errors.gioiTinh}
                            >
                                {selectGioiTinh.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
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
                        <Grid item xs={12} lg={6}>
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
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth size="medium"
                                id="soDienThoai"
                                name="soDienThoai"
                                label="Số điện thoại"
                                value={formik.values.soDienThoai}
                                onChange={formik.handleChange}
                                error={formik.touched.soDienThoai && Boolean(formik.errors.soDienThoai)}
                                helperText={formik.touched.soDienThoai && formik.errors.soDienThoai}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth size="medium"
                                id="tieuDe"
                                name="tieuDe"
                                label="Tiêu đề"
                                value={formik.values.tieuDe}
                                onChange={formik.handleChange}
                                error={formik.touched.tieuDe && Boolean(formik.errors.tieuDe)}
                                helperText={formik.touched.tieuDe && formik.errors.tieuDe}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="medium"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                id="noiDung"
                                name="noiDung"
                                label="Nội dung"
                                value={formik.values.noiDung}
                                onChange={formik.handleChange}
                                error={formik.touched.noiDung && Boolean(formik.errors.noiDung)}
                                helperText={formik.touched.noiDung && formik.errors.noiDung}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button size="large" disabled={isSubmited.loading} color="secondary" variant="contained" fullWidth type="submit">
                                {isSubmited.loading ? <CircularProgress /> : <Typography>Gửi thông tin</Typography>}
                            </Button>

                        </Grid>
                    </Grid>
                    <Snackbar open={isSubmited.loadSuccess} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Bạn đã gửi thông tin thành công!
                        </Alert>
                    </Snackbar>
                </form>
            </Container>
        </Box>
    )
}