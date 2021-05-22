import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory,Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: '24%',
    margin: 5,
  },
  img: {
    objectFit: 'fill'
  },
});

export default function CourseItem(props) {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState(4);
  const { item } = props;

  const handClick =(maKhoaHoc)=>{
    history.push("/detail/" + maKhoaHoc);
}
  return (
     <Card  className={classes.root, "course-card"}>
      <CardActionArea onClick={()=>handClick(item.maKhoaHoc)}>
        <CardMedia
        className={classes.img}
          component="img"
          alt="Đang cập nhật ảnh"
          height="230"
          
          image={item.hinhAnh}
          title="Contemplative Reptile"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            {item.tenKhoaHoc.length>40?item.tenKhoaHoc.substring(0, 40) + "..." :item.tenKhoaHoc}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
          {item.moTa.length>8
            0?item.moTa.substring(0, 80) + "..." :item.moTa}
          </Typography> */}
          
          <div>
            Lượt xem: {item.luotXem}
          </div>
          <Box component="fieldset" mb={1} borderColor="transparent">
            <Rating
            size="small"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Link to={`/detail/${item.maKhoaHoc}`} style={{textDecoration:"none",marginLeft:"40px"}}>
                        <Button variant="outlined" size="small" color="secondary">
                            Xem chi tiết
                        </Button>
            </Link>
          </Box>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Đăng kí
        </Button>
      </CardActions> */}
    </Card>
  );
}