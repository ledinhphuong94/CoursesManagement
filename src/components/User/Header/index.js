import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useSelector} from 'react-redux';
import { userLogOut } from '../../../redux/actions/User/logOut'
import { fade, makeStyles } from '@material-ui/core/styles';
import { getUserAcount } from '../../../redux/actions/User/ThongTinTaiKhoan'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import { scroller } from "react-scroll";
import '../../../styles/css/main.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: '0',
    },

    flexGrow: 1,
  },

  colorPrimary: {
    background: 'linear-gradient(to left,#EC5252 0%,#6E1A52 100%)',
  },
 
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
    color: '#EC5252',
  },
  menuButtonOutlined: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
 
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  logIn: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
    fontFamily:'Shadows Into Light',
    fontSize:'32px',
    padding:'6px 0 6px 10px'
  },

}));

function scrollToSectionId(id) {
  scroller.scrollTo(id, {
    duration: 500,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export default function Header() {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser} = useSelector((state) => state.loginReducer);
  useEffect(()=>{
    if(currentUser){
      dispatch(getUserAcount({taiKhoan:currentUser.taiKhoan}))
    }
  },[])
  const handleScroll = (id) => {
    var myElem = document.getElementById(id);
    if (myElem === null) {
      history.push("/#");
      setTimeout(function(){
        scrollToSectionId(id);
      }, 1000);
      
    } else {
      scrollToSectionId(id);
    }
  };

  const handleLogout = () => {
    dispatch(userLogOut());
  }

  const keyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (event.target.value !== "") {
        history.push("/search/" + event.target.value);
      }
    }
  }

  return (
    <div id="myheader" className={classes.root}>
      <AppBar position="static" className={classes.colorPrimary}>
        <Toolbar>    
          <Typography component="span" variant="h6" className={classes.title}>
              <Link to="/" style={{textDecoration:'none'}}>
              <img className={classes.logoimg} src="/img/logo2.png" alt="Course" />
              <span style={{paddingLeft:'10px',textDecoration:'none',color:'white',}}>Steven</span>
              </Link>
          </Typography>
           
          <div id="search-course" className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm khóa học…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}

              onKeyDown={keyPress}
            />
          </div>
          <nav>
            <ul>
              <li class="courses"><a href="#"><Link to="/search">Các Khóa học</Link></a></li>
              <li class="teachers"><a href="#" onClick={() => handleScroll("teachers")}>Giảng viên</a></li>
              <li class="students"><a href="#" onClick={() => handleScroll("students")}>Học viên</a></li>
              <li class="contact"><a href="#" onClick={() => handleScroll("contact")}>Liên hệ</a></li>
            </ul>
          </nav>
          <div id="logInSection">
            {currentUser? (<Button className="loginButton" startIcon={<AccountCircleIcon />}>{currentUser.hoTen}</Button>):(<Button className="loginButton" startIcon={<AccountCircleIcon />} component={Link} to="/login">Đăng nhập</Button>)}
            
            <div id="hoverLogIn">
              <div id="hoverLoginContent" className={classes.logIn}>
                <List aria-label="main mailbox folders">
                  {
                    currentUser? (
                    <div>
                    <ListItem>
                      <Typography variant="h5" align="center">Xin chào <span style={{color:'gray'}}>{currentUser.hoTen}</span></Typography>
                    </ListItem> 
                    <ListItem>
                      <Typography variant="overline">{`Tài khoản #: ${currentUser.taiKhoan}`}</Typography>
                    </ListItem>
                    </div>  ) : null
                  }
                  <Divider />
                  {currentUser?null:  (  <ListItem><Button className="logInButtonInside" component={Link} to="/login" classes={{ root: classes.menuButton, }} variant="contained" style={{ width: '100%', color: 'black' }}>Đăng nhập</Button></ListItem>)}
                  {currentUser ? null : (
                  <ListItemLink style={{color:'blue'}} to="/reg-user" classes={{ root: classes.menuButtonOutlined, }}> 
                    <ListItemIcon>
                      <ContactMailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chưa có tài khoản? Đăng ký ngay" />
                  </ListItemLink>
                  )}
                  <ListItemLink to="/account">
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tài khoản" />
                  </ListItemLink>

                  <ListItemLink to="/account/update-account">
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sửa thông tin" />
                  </ListItemLink>

                  <ListItemLink to="/account/course-management">
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Khóa học của tôi" />
                  </ListItemLink>

                  {currentUser?.maLoaiNguoiDung === "GV" ? (
                  <ListItemLink to="/admin">
                      <ListItemIcon>
                        <SupervisorAccountIcon />
                      </ListItemIcon>
                      <ListItemText primary="Quản trị Admin" />
                    </ListItemLink>) : null}
                                
                  {currentUser? ( <ListItem>
                      <Button className="logInButtonInside" onClick={() => handleLogout()} classes={{ root: classes.menuButton, }} variant="contained" style={{ width: '100%', color: 'black' }}>Đăng xuất</Button>
                  </ListItem>):null}
                
                  <Divider />
                </List>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

    </div>
  );
}
