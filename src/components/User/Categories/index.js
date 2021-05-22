import React from 'react'
import {  useDispatch } from "react-redux";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {setIdCategory} from '../../../redux/actions/User/Common'
import { scroller } from "react-scroll";
const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    mycard:{
        height:160,
    }
});
function scrollToSection(){
    scroller.scrollTo("courseList", {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }; 

export default function Categories() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = (value) => {
        dispatch(setIdCategory(value));
        scrollToSection();
    };

    return (
        <div id="categories" className="categories">
            <h2 className="categories__title">
            CHUYÊN NGÀNH
            </h2>
                <div className="categories__content">
                

                    <Box display="flex" flexWrap="wrap">
                        <Box  p={1}  className="category-card">
                            <Card className={classes.root}>
                                <CardActionArea onClick={()=>handleClick(0)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="img\dm-frontend.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.mycard} >
                                        <Typography gutterBottom variant="h5" component="h2">
                                            LẬP TRÌNH FRONT END
                                </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Nắm vững  CSS, SASS, HTML5, CSS3.
                                            Xây dựng các dự án thực tế về Angular và React JS, tương tác Backend, Servies, Web API, JSON
                                 </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* <CardActions>
                                    <Button size="small" color="primary">
                                        Xem các khóa học
                            </Button>
                                </CardActions> */}
                            </Card>
                        </Box>
                        <Box p={1} className="category-card">
                            <Card className={classes.root}>
                                <CardActionArea onClick={()=>handleClick(1)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="img\dm-backend.png"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.mycard}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            LẬP TRÌNH BACK END
          </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Giúp học viên phân tích hệ thống, tư duy lập trình tốt, xây dựng hệ thống ứng dụng.
                                            Xây dựng API cho hệ thống.
          </Typography>
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                        </Box>
                        <Box p={1}  className="category-card">
                            <Card className={classes.root}>
                                <CardActionArea onClick={()=>handleClick(2)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="img\dm-fullstack.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.mycard}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            LẬP TRÌNH FULL STACK
          </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Trang bị kiến thức về toàn bộ công nghệ tạo nên một trang web. Lập trình viên có thể làm việc trong cả hai ngôn ngữ front-end và back-end.
          </Typography>
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                        </Box>
                        <Box p={1} className="category-card">
                            <Card className={classes.root}>
                                <CardActionArea onClick={()=>handleClick(3)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="img\dm-logic.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.mycard}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            LẬP TRÌNH TƯ DUY
          </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Các môn học lập trình cơ bản, tư duy logic làm nền tảng cho việc trở thành lập trình viên chuyên nghiệp. 
          </Typography>
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                        </Box>
                        <Box p={1}  className="category-card">
                            <Card className={classes.root}>
                                <CardActionArea onClick={()=>handleClick(4)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="img\dm-design.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.mycard}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            THIẾT KÊ
          </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" >
                                        Thiết kế đồ họa - Web đã và đang trở thành mảnh đất màu mỡ, khát nhân lực với hàng ngàn công ty quảng cáo đang tìm kiếm ứng viên.
          </Typography>
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                        </Box>
                        <Box p={1}  className="category-card"
                        // bgcolor="grey.300"
                        >
                            <Card className={classes.root}>
                                <CardActionArea onClick={()=>handleClick(5)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="img\dm-mobi.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent className={classes.mycard}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            LẬP TRÌNH DI ĐỘNG
          </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        Nếu bạn đam mê và muốn tìm kiếm cơ hội việc làm trong lĩnh vực Lập trình ứng dụng di động,đừng bỏ lỡ cơ hội.
          </Typography>
                                    </CardContent>
                                </CardActionArea>
                                
                            </Card>
                        </Box>
                    </Box>
                </div>
        </div>
    );
}
