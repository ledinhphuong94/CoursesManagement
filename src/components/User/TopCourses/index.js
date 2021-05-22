import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCourseList } from '../../../redux/actions/useAPICourses';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import {shorternText} from '../../../utils/shorternText'

const useStyles = makeStyles({
  root: {
    height: 500,
  },
  media: {
    height: 200,
    width:'100%',
  },
  titleHeader:{
      color:'#992337',
      fontWeight: 'bold',
      marginTop:'80px',
      fontSize: '2rem',
  }
});
// const theme = {
//     spacing: 8,
// }
export default function Students() {
  const classes = useStyles();
  const { courseList} = useSelector((state) => state.courseReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseList())
    console.log(courseList)
  }, []);

  let topCourseList = courseList.sort((course, nextCourse) => {
    return nextCourse.luotXem - course.luotXem
  })

  // let topEightCourses = topCourseList.splice(8, topCourseList.length - 8)
  let topEightCourses = topCourseList.filter((item,index)=>{
      return index < 8
  })

  return (
    <Container maxWidth="lg">
      <Typography className={classes.titleHeader} variant="h3" gutterBottom align="center" >
        TOP KHÓA HỌC
      </Typography>    
      <Box p={4}>
        <Grid container spacing={3} p={10}>
          {topEightCourses.map((item) => {
            return (
              <Grid item lg={3} md={6} xs={12}>
                <Card id="studentCard" className={classes.root} mb={6}>
                  <CardActionArea>
                    <Link to={`/detail/${item.maKhoaHoc}`} style={{textDecoration:"none"}}>
                      <CardMedia
                        className={classes.media}
                        image={item.hinhAnh}
                        title={item.tenKhoaHoc}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.tenKhoaHoc}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          <Box component="div" my={2}>
                            {shorternText(item.moTa)} 
                          </Box>
                        </Typography>
                        <Box mt={2}>
                          <Typography variant="caption" display="block" gutterBottom pt={5}>
                            View: {item.luotXem}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Link>
                  </CardActionArea>

                  <CardActions>
                    <Button size="small" color="primary">
                        Chia sẽ
                      </Button>
                    <Link to={`/detail/${item.maKhoaHoc}`} style={{textDecoration:"none"}}>
                        <Button variant="contained" size="small" color="secondary">
                            Xem chi tiết
                        </Button>
                    </Link>


                  </CardActions>
                </Card>
              </Grid>
            )
          })
          }
        </Grid>
      </Box>
    </Container>

  )

}
