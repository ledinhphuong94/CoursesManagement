import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
}));

export default function DanhSachDaDangKy(props) {
    let approvedCoursesTable = []
    if(props.data.chiTietKhoaHocGhiDanh){
        approvedCoursesTable = props.data?.chiTietKhoaHocGhiDanh.map((item, index) => {
            index++
            return { id: index, ...item }
        }) 
    }

    const classes = useStyles();
    const rows: GridRowsProp = [...approvedCoursesTable]
    const columns: GridColDef[] = [
        { field: 'tenKhoaHoc', headerName: 'Tên khóa học', flex: 450 },
        { field: 'maKhoaHoc', headerName: 'Mã khóa học', flex: 150 },
    ];

    return (
        <Card className={classes.root}>
            <Typography className={classes.head} variant="h5" color="primary" gutterBottom align="center">Danh sách khóa học đã đăng ký</Typography>
            <Divider />
            <div style={{ height: 480, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={7} pagination/>
            </div>
        </Card>
    )
}
