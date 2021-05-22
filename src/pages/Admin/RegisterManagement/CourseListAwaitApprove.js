import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import { getUserList } from '../../../redux/actions/Admin/userList'
import { useSelector, useDispatch } from 'react-redux'
import "../../../styles/scss/Layouts/adminTable.scss"
import { getCoursesAwaitApprove } from '../../../redux/actions/Admin/getCoursesAwaitApprove'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { fade,makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { approveCourses } from '../../../redux/actions/Admin/approveCourses'
import { deleteMyCourses } from '../../../redux/actions/User/DeleteCourses'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid blue',
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, 0.1),
        },
        margin: theme.spacing(3),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: '45%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
      },
}));
export default function CourseListAwaitApprove() {
    const classes = useStyles();
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const { userList, error, loading } = useSelector((state) => state.getUserListReducer)
    const { danhSachKhoaHocChoDuyet, error2, loading2 } = useSelector((state) => state.getCoursesAwaitApproveReducer)
    const { approveStatus, loading3, error3 } = useSelector((state) => state.approveCoursesReducer)
    const { deleteCourse } = useSelector((state) => state.deleteCoursesReducer)
    let [searchKeyWord, setSearchKeyWord] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        if (userList.length === 0) {
            dispatch(getUserList());
        }  
    }, [])
    useEffect(() => {
        console.log("chạy lại")
        userList.map((item, index) => {
            dispatch(getCoursesAwaitApprove({ taiKhoan: item.taiKhoan }, item.taiKhoan))
        })
        setOpen1(false);
        setOpen2(false)
    }, [userList])
    // console.log(danhSachKhoaHocChoDuyet)
    // console.log("test test test")
    const approveCoursesRequest = (value) => {
        dispatch(approveCourses(value))
        // document.getElementById(`thongBao${value.taiKhoan}+${value.maKhoaHoc}`).style.display = "block";
        document.getElementById(`row${value.taiKhoan}+${value.maKhoaHoc}`).classList.add("disableRow");
        setOpen1(!open1);
        setTimeout(() => dispatch(getUserList()), 2000);

    }
    const dontApproveCourse = (value) => {
        dispatch(deleteMyCourses(value))
        document.getElementById(`row${value.taiKhoan}+${value.maKhoaHoc}`).classList.add("disableRow");
        setOpen2(!open2);
        setTimeout(() => dispatch(getUserList()), 2000);
    }

    let mangFinal =[]
    danhSachKhoaHocChoDuyet.map((item, index)=>{
        userList.map((ite,ide)=>{
            if(item[0] === ite.taiKhoan){
                mangFinal.push([ite.hoTen,ite.email,...item])
            }
        }) 
    })
    // console.log("finalList",mangFinal)

    let searchValue = mangFinal.filter((item, index)=>{
        return item[2].toLowerCase().trim().includes(searchKeyWord,0) || item[1].toLowerCase().trim().includes(searchKeyWord,0) || item[0].toLowerCase().trim().includes(searchKeyWord,0)
    })
    
    const searchFunction = (evt) => {
        console.log(evt.target.value)
        let tuKhoa = evt.target.value.toLowerCase().trim()
        setSearchKeyWord(tuKhoa)
    }

    if (loading) {
        return (
            <div className="loading">
                <CircularProgress color="secondary" />
            </div>
        )
    }
    return (
        <div>
            <Box align="center" component="h3">Danh sách học viên chờ xét duyệt khóa học</Box>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Tìm tài khoản, tên hoặc email người dùng…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }} 
                    fullWidth="true"
                    onChange={(evt)=>searchFunction(evt)}
                />
            </div>
            <Backdrop className={classes.backdrop} open={open1}>
                <CircularProgress color="inherit" />
                <div className="thongBao">{approveStatus}</div>
            </Backdrop>
            <Backdrop className={classes.backdrop} open={open2}>
                <CircularProgress color="inherit" />
                <div className="thongBao">{deleteCourse}</div>
            </Backdrop>
            <table id="t01">
                <tr>
                    <th>Tài khoản:</th>
                    <th>Tên:</th>
                    <th>Email:</th>
                    <th>Khóa học chờ duyệt:</th>
                </tr>
                {
                    searchValue.map((item, index) => {
                        if (item.length > 3) {
                            return (
                                <tr>
                                    <td className="tenTK">{item[2]}</td>
                                    <td className="">{item[0]}</td>
                                    <td className="">{item[1]}</td>
                                    <td>
                                        {
                                            item.map((ite, ide) => {
                                                if (ide > 2) {
                                                    return (

                                                        <tr className="khoaHocChoDuyet" id={`row${item[2]}+${ite.maKhoaHoc}`} key={ide}>
                                                            <td className="tenKH">Tên Khóa học: <Typography color="primary">{ite.tenKhoaHoc}</Typography></td>
                                                            <td className="tenKH">Mã KH: <Typography color="primary">{ite.maKhoaHoc}</Typography></td>

                                                            <td>
                                                                <Button
                                                                    id={`button${item[2]}+${ite.maKhoaHoc}`}
                                                                    variant="contained" color="primary" className={classes.button} startIcon={<ThumbUpIcon />} onClick={() => approveCoursesRequest({ maKhoaHoc: ite.maKhoaHoc, taiKhoan: item[2] })}
                                                                >
                                                                    Duyệt
                                                                    </Button>
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    className={classes.button}
                                                                    startIcon={<DeleteIcon />}
                                                                    onClick={() => dontApproveCourse({ maKhoaHoc: ite.maKhoaHoc, taiKhoan: item[2] })}
                                                                >
                                                                    Hủy
                                                                    </Button>
                                                            </td>
                                                        </tr>

                                                    )
                                                }
                                            })
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    })
                }

            </table>

        </div>
    )
}
