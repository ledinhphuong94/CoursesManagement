import * as yup from 'yup';
const txtRequired="Không được để giá trị trắng!"
export const yupSchema = yup.object().shape({
    taiKhoan: yup.string().required(txtRequired).min(2,"Tối thiểu 2 kí tự!").max(11,"Tối đa 12 kí tự"),
    matKhau: yup.string().required(txtRequired).min(3,"Tối thiểu 3 kí tự!"),
    hoTen: yup.string().required(txtRequired),
    soDt: yup.string().required(txtRequired).matches(/^[0-9]+$/),
    soDT: yup.string().required(txtRequired).matches(/^[0-9]+$/),
    maNhom: yup.string().required(txtRequired),
    email: yup.string().required(txtRequired).email("Email sai định dạng!"),
    maKhoaHoc: yup.string().required(txtRequired),
    biDanh: yup.string().required(txtRequired),
    tenKhoaHoc: yup.string().required(txtRequired),
    moTa: yup.string().required(txtRequired).min(20,"Tối thiểu 20 kí tự!"),
    hinhAnh: yup.string().required(txtRequired),
    ngayTao: yup.string().required(),
    maDanhMucKhoaHoc: yup.string().required(),  
    taiKhoanNguoiTao: yup.string().required(),
    maLoaiNguoiDung: yup.string().required(txtRequired),
})

export const yupLogin = yup.object().shape({
    taiKhoan: yup.string().required(txtRequired),
    matKhau: yup.string().required(txtRequired),
})

export const yupUserManagerment = yup.object().shape({
    taiKhoan: yup.string().required(txtRequired).min(2,"Tối thiểu 2 kí tự!").max(11,"Tối đa 12 kí tự"),
    matKhau: yup.string().required(txtRequired).min(3,"Tối thiểu 3 kí tự!"),
    hoTen: yup.string().required(txtRequired),
    soDt: yup.string().required(txtRequired).matches(/^[0-9]+$/),
    email: yup.string().required(txtRequired).email("Email sai định dạng!"),
    maLoaiNguoiDung: yup.string().required(txtRequired),
})