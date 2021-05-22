import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CardMedia} from '@material-ui/core';
//import Image from 'material-ui-image';
import Controls from "../../../views/controls";
import { useForm, Form } from '../../../views/useForm';
import { getCategories } from '../../../redux/actions/useAPICourses';
import { TAI_KHOAN } from '../../../redux/constants/common'

//import { id } from 'date-fns/locale';

const useStyles = makeStyles(theme => ({
    img: {
        width: '350px',
        height: '300px',
        marginLeft: '10px'
    },

}))
const initialFValues = {
    maKhoaHoc: '',
    biDanh: '',
    tenKhoaHoc: '',
    moTa: '',
    hinhAnh: '',
    luotXem: 0,
    danhGia: 0,
    maNhom: 'GP01',
    ngayTao: new Date().toISOString().substring(0, 10),
    maDanhMucKhoaHoc: '',
    taiKhoanNguoiTao: TAI_KHOAN,
    currentFile: undefined
}

export default function CourseForm(props) {
    const classes = useStyles();
    const { categories} = useSelector((state) => state.categoriesReducer);
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('')
    const [selectedFile, setSelectedFile] = useState(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('maKhoaHoc' in fieldValues)
            temp.maKhoaHoc = fieldValues.maKhoaHoc ? "" : "Không được để trắng"
        if ('biDanh' in fieldValues)
            temp.biDanh = fieldValues.biDanh ? "" : "Không được để trắng"
        if ('tenKhoaHoc' in fieldValues)
            temp.tenKhoaHoc = fieldValues.tenKhoaHoc ? "" : "Không được để trắng"
        // if ('hinhAnh' in fieldValues)
        //     temp.hinhAnh = fieldValues.hinhAnh ? "" : "Không được để trắng"
        // if ('tenKhoaHoc' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email không đúng định dạng."
        // if ('mobile' in fieldValues)
        //     temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('maDanhMucKhoaHoc' in fieldValues)
            temp.maDanhMucKhoaHoc = fieldValues.maDanhMucKhoaHoc.length !== 0 ? "" : "Chưa chọn danh mục khóa học"

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    useEffect(() => {
        dispatch(getCategories());
    },[])

    useEffect(() => {
        if (recordForEdit !== null) {
            setValues({
                ...recordForEdit, maDanhMucKhoaHoc: recordForEdit.danhMucKhoaHoc.maDanhMucKhoahoc
            })
            setFileName(recordForEdit.hinhAnh);
            setIsEdit(true)
        } else
            setIsEdit(false)
    }, [recordForEdit])

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            if (selectedFile !== undefined)
                addOrEdit({ ...values, currentFile: selectedFile, hinhAnh: selectedFile.name }, resetForm);
            else
                addOrEdit({ ...values, currentFile: selectedFile }, resetForm);
        }
    }

    const handleChangeFile = (event) => {
        if (event.target.files.length > 0) {
            setFileName(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0])
        } else {
            setFileName('');
            setSelectedFile(undefined)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="maKhoaHoc"
                        label="Mã khóa học"
                        value={values.maKhoaHoc}
                        onChange={handleInputChange}
                        error={errors.maKhoaHoc}
                        disabled={isEdit}
                    />
                    <Controls.Input
                        name="biDanh"
                        label="Bí danh"
                        value={values.biDanh}
                        onChange={handleInputChange}
                        error={errors.biDanh}
                    />
                    <Controls.Input
                        label="Tên khóa học"
                        name="tenKhoaHoc"
                        value={values.tenKhoaHoc}
                        onChange={handleInputChange}
                        error={errors.tenKhoaHoc}
                    />
                    <Controls.Select
                        name="maDanhMucKhoaHoc"
                        label="Danh mục khóa học"
                        value={values.maDanhMucKhoaHoc}
                        onChange={handleInputChange}
                        options={categories.map((item) => { return { id: item.maDanhMuc, title: item.tenDanhMuc } })}
                        error={errors.maDanhMucKhoaHoc}
                    />
                    <Controls.Input
                        label="Mô tả"
                        name="moTa"
                        value={values.moTa}
                        onChange={handleInputChange}
                        error={errors.moTa}
                        multiline
                        rows={5}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controls.Input
                        type='file'
                        accept="image/*"
                        label="Hình ảnh"
                        name="hinhAnh"
                        value={values.currentFile}
                        onChange={handleChangeFile}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* <div>
                        <Image src={fileName} className={classes.img}/>
                    </div> */}
                    <CardMedia
                        className={classes.img}
                        image={fileName}
                    />
                    <br></br>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Lưu" />
                        {/* <Controls.Button
                            text="Bỏ qua"
                            color="default"
                            onClick={resetForm} /> */}
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
