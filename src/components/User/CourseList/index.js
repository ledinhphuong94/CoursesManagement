import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CourseOfCategory from './CourseOfCategory';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };

}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    tabColor: {
        backgroundColor: '#2e1534',
    },
}));

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);




export default function CourseList() {

    const classes = useStyles();
    const theme = useTheme();
    const { categoryItemSelected } = useSelector((state) => state.commonUserReducer);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        setValue(categoryItemSelected);
    }, [categoryItemSelected]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div id="courseList" >
            <h2 className="courseList__title">
                KHÓA HỌC
            </h2>
            <div className="courseList">
            
                <div className={classes.tabColor}>
                    <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                        <StyledTab label="Front End" />
                        <StyledTab label="Back End" />
                        <StyledTab label="FullStack" />
                        <StyledTab label="Tư duy" />
                        <StyledTab label="Thiết kế" />
                        <StyledTab label="Di động" />
                    </StyledTabs>
                    <Typography className={classes.padding} />
                </div>
                {/* <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Front End" {...a11yProps(0)} />
                    <Tab label="Back End" {...a11yProps(1)} />
                    <Tab label="FullStack" {...a11yProps(2)} />
                    <Tab label="Tư duy" />
                    <Tab label="Thiết kế" {...a11yProps(4)} />
                    <Tab label="Di động" {...a11yProps(5)} />

                </Tabs>
            </AppBar> */}
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <CourseOfCategory category="FrontEnd"></CourseOfCategory>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <CourseOfCategory category="BackEnd"></CourseOfCategory>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <CourseOfCategory category="FullStack"></CourseOfCategory>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <CourseOfCategory category="TuDuy"></CourseOfCategory>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <CourseOfCategory category="Design"></CourseOfCategory>
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <CourseOfCategory category="DiDong"></CourseOfCategory>
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    );
}
