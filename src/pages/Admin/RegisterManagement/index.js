import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CourseListAwaitApprove from './CourseListAwaitApprove'
import ApprovedCoursesList from './ApprovedCoursesList'
import ApprovedCoursesListByCourses from './ApprovedUserListByCourses'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    rootS: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    myInput: {
        height: '10px',
    },
    button: {
        margin: theme.spacing(1),
    },

}));

export default function RegisterManagement() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" noWrap color="primary">
                            QUẢN LÝ ĐĂNG KÝ
                    </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <div className={classes.rootS}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="Quản lý đăng ký" variant="fullWidth" >
                        <Tab label="Danh sách người dùng chờ duyệt" {...a11yProps(0)} />
                        <Tab label="Danh sách người dùng có khóa học đã duyệt" {...a11yProps(1)} />
                        <Tab label="Danh sách khóa học theo người dùng đã duyệt" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <CourseListAwaitApprove/>
      </TabPanel>
                <TabPanel value={value} index={1}>
                    <ApprovedCoursesList/>
      </TabPanel>
                <TabPanel value={value} index={2}>
                    <ApprovedCoursesListByCourses/>
      </TabPanel>
            </div>
        </div>
    )
}
