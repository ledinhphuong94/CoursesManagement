import React from 'react'
import { Link } from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import { userLogOut } from '../../redux/actions/User/logOut'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from '@material-ui/core/Button';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    trangChu:{
        position:'absolute',
        right:'20px',
        top:0,
        textDecoration:'none',
        color: 'white',
        fontWeight:'bold',
        height: '100%',

    }
}));

export default function AdminLayout(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

//     const admMenu=[
//     {value: "/admin/user", name:"Quản lý người dùng"},
//     {value: "/admin/course",name: "Quản lý khóa học"},
//     {value: "/admin/register",name: "Quản lý đăng ký"},
// ]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch(userLogOut());
      }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton> 
                    <Typography variant="h6" noWrap>
                        Quản trị hệ thống
                    </Typography>
                    <Link to="/"><Button variant="outlined" color="primary" className={classes.trangChu}>Trang Chủ</Button></Link>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {/* {admMenu.map((item, index) => (
                        <ListItem button key={item.name} component={Link} to={item.value}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={item.name}  />
                        </ListItem>
                    ))} */}
                    
                    <ListItem button key={"btnuser"} component={Link} to={"/admin/user"}>
                            <ListItemIcon> <PersonIcon/></ListItemIcon>
                            <ListItemText primary={"Quản lý tài khoản"}  />
                    </ListItem>
                    <ListItem button key={"btncourse"} component={Link} to={"/admin/course"} >
                            <ListItemIcon> <MenuBookIcon/></ListItemIcon>
                            <ListItemText primary={"Quản lý khóa học"}  />
                    </ListItem>
                    <ListItem button key={"btnregister"} component={Link} to={"/admin/register"}>
                            <ListItemIcon> <CheckIcon/></ListItemIcon>
                            <ListItemText primary={"Quản lý đăng ký"}  />
                    </ListItem>

                    <ListItem button key={"dangXuat"} component={Link} to={"/"} onClick={() => handleLogout()} >
                            <ListItemIcon> <ExitToAppIcon/></ListItemIcon>
                            <ListItemText primary={"Đăng xuất"}  />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div>{props.children}</div>
                
                {/* <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography> */}
            </main>
        </div>
    );
}