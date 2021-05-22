import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Header from '../../components/User/Header'
import Footer from '../../components/User/Footer'
import {Link,Redirect} from 'react-router-dom'
// Material-UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UpdateIcon from '@material-ui/icons/Update';
import ListIcon from '@material-ui/icons/List';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  background:{
    backgroundColor:'#D8E6F1',
  },
  layout:{
      margin: '50px 0', 
  }
}));

export default function AccountLayout(props) {
    const classes = useStyles();
    const { currentUser } = useSelector((state) => state.loginReducer);
    const { linkTab } = useSelector((state) => state.getLinkReducer);
    const listOfFunctions = [
        {id:"account", name:"Thông tin tài khoản", path:"/account", icon:<AccountCircleIcon />,status:false},
        {id:"update-account",name:"Cập nhật tài khoản ", path:"/account/update-account",  icon:<UpdateIcon />,status:false},
        {id:"course-management",name:"Quản lý khóa học của bạn", path:"/account/course-management",  icon:<ListIcon />,status:false},
        {id:"admin",name:"Trang quảng trị Admin", path:"/admin",  icon:<SupervisorAccountIcon />,status:false},
    ]
    const [style,setStyle] = useState(listOfFunctions)

    useEffect(() => {  
        console.log("link",linkTab)
            setStyle(listOfFunctions.map((item,index)=>{
                if(linkTab === item.path){
                    return {...item,status:true}
                }
                return {...item,status: false}
            }))
    },[linkTab])

    if(currentUser === undefined){
        return <Redirect to="/login"/>
    }
 
    return (
        <div className={classes.background}>
            <Header />
            <Container maxWidth="lg">
                <Grid container className={classes.layout} direction="column" justify="space-between">
                    <Grid container item xs={12} justify="center">   
                                {style.map((item,index)=>{
                                    if(currentUser?.maLoaiNguoiDung === "GV"){
                                        return (
                                            <Grid item>
                                                <Card>
                                                    <Button 
                                                    id={item.id}
                                                    component={Link} to={item.path} key={index}
                                                    variant="outlined"
                                                    color={item.status?'secondary':'main'}
                                                    startIcon={item.icon}>
                                                        {item.name}
                                                    </Button>
                                                </Card>
                                            </Grid>
                                        )
                                    }else{
                                        if(index < listOfFunctions.length - 1){
                                            return (
                                                <Grid item>
                                                    <Card>
                                                        <Button 
                                                        id={item.id}
                                                        component={Link} to={item.path} key={index}
                                                        variant="outlined"
                                                        color={item.status?'secondary':'main'}
                                                        startIcon={item.icon}>
                                                            {item.name}
                                                    </Button>
                                                    </Card>
                                                </Grid>
                                            )
                                        }      
                                    }
                                })} 
                    </Grid>
                    <Grid item xs={12} style={{marginTop:'20px'}} >
                        <Card className={classes.root}>
                            {props.children}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
    
   

}