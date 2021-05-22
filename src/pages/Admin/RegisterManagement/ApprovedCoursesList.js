import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getApprovedCourses } from '../../../redux/actions/Admin/getApprovedCourses'
import "../../../styles/scss/Layouts/adminTable.scss"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade,makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
          width: '30%',
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

export default function ApprovedCoursesList() {
    const classes = useStyles();
    const { userList, error, loading } = useSelector(state => state.getUserListReducer)
    const { approvedCourseList, error2, loading2 } = useSelector(state => state.getApprovedCoursesReducer)    
    const dispatch = useDispatch();
    let [searchKeyWord, setSearchKeyWord] = useState("");
   
    // console.log("userList", approvedCourseList)
    useEffect(() => {
        userList.map((item, index) => {
            dispatch(getApprovedCourses({ taiKhoan: item.taiKhoan }, item.taiKhoan))
        })
    }, [userList])

    let searchValue = approvedCourseList.filter((item, index)=>{
        return item[0].toLowerCase().trim().includes(searchKeyWord,0)
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
            <Box align="center" component="h3">Danh sách khóa học đã được duyệt theo học viên</Box>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Tìm tài khoản người dùng…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }} 
                    fullWidth="true"
                    onChange={(evt)=>searchFunction(evt)}
                />
            </div>
          
            <table id="t01">
                <tr>
                    <th>Tài khoản:</th>
                    <th>Tên:</th>
                    <th>Email:</th>
                    <th>Khóa học đã được duyệt</th>
                </tr>
                {searchValue.map((item, index) => {
                    return (
                        <tr>
                            <td className="tenTK">
                                {item[0]}
                            </td>
                            {userList.map((itemDetail, index) => {
                                if (itemDetail.taiKhoan === item[0]) {
                                    return (
                                        <React.Fragment>
                                            <td>{itemDetail.hoTen}</td>
                                            <td>{itemDetail.email}</td>
                                        </React.Fragment>
                                    )
                                }
                            })}

                            <td>
                                {item.map((ite, ide) => {
                                    if (ide !== 0) {
                                        return (
                                            <tr class="khoaHocChoDuyet">
                                                <td className="tenKH">Mã khóa học: <Typography color="primary">{ite.maKhoaHoc}</Typography></td>
                                                <td className="tenKH">Tên Khóa học: <Typography color="primary">{ite.tenKhoaHoc}</Typography></td>
                                            </tr>
                                        )
                                    }

                                })}
                            </td>
                        </tr>
                    )
                })}

            </table>
        </div>
    )
}
