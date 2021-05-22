import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCourseSearch } from '../../../redux/actions/useAPICourses';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useHistory,Link } from 'react-router-dom';
import {shorternText} from '../../../utils/shorternText'

const useStyles = makeStyles({
    root: {
        width: 245,
        height: 400,
        margin: 20,
    },
    media: {
        height: 140,
    },
});


export default function CoursesSearch() {
    const classes = useStyles();
    let history = useHistory();
    const { courseList} = useSelector((state) => state.courseReducer);
    let { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourseSearch(id));
    }, [id]);

    const handClick =(maKhoaHoc)=>{
        history.push("/detail/" + maKhoaHoc);
    }
    return (
        <div className="container mt-3">
            <Typography align="center" variant="h4" color="secondary" gutterBottom>Danh sách khóa học</Typography>
            <Grid container justify="center">
                {courseList.map((item) => {
                    return <Grid item xs={12} sm={6} md={4} lg={3}> <Card key={item.maKhoaHoc} className={classes.root}>
                        <CardActionArea onClick={()=>handClick(item.maKhoaHoc)}>
                            <CardMedia
                                className={classes.media}
                                image={item.hinhAnh}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.tenKhoaHoc}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {shorternText(item.moTa)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                      </Button>
                      <Link to={`/detail/${item.maKhoaHoc}`} style={{textDecoration:"none",marginLeft:"20px"}}>
                        <Button variant="outlined" size="small" color="secondary">
                            Xem chi tiết
                        </Button>
                        </Link>
                        </CardActions>
                    </Card> </Grid>
                })}
            </Grid>
        </div>
    )
}

