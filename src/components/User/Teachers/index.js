import React from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 200,
      minHeight:500,
      margin:'6px'
    },
    card: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    img:{
        width:'100%',
        height:'100%'
    }
  
  });
export default function Teacher() {
    const classes = useStyles();
    return (
        
        <div id="teachers" className="teacher">
            <Container maxWidth="lg">
                <div className="teacher__quote">
                    <h1>Đội ngũ giáo viên</h1>
                    <p>Hãy gặp gỡ đội ngũ giáo viên của chúng tôi</p>
                </div>

                <Grid container className="oursTeacher">

                    <Grid item xs={12} md={6} lg={3} className="mark-Wilson" spacing={2}>
                        <Card className={classes.root}>
                        <img className={classes.img} src="img/author-image1.jpg" alt="Card image cap" width="100%"/>
                        <div className="card-body">
                            <h5 className="card-title">Phương Thế Vinh</h5>
                            <p className="card-text">Tôi thích đào tạo học sinh từ zero thành hero</p>
                            <hr />
                            <div className="card-body-contact">
                                <a href=""> <i class="fab fa-facebook"  style={{color: "blue"}}></i></a>
                                <a href=""> <i class="fab fa-twitter" style={{margin:'0 10px'}}></i></a>
                                <a href=""><i class="fab fa-instagram" style={{color: "pink"}}></i></a>
                            </div>

                        </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} className="catherine">
                        <Card className={classes.root}>
                        <img className={classes.img} src="img/author-image2.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Catherine</h5>
                            <p className="card-text">Common baby!!!</p>
                            <hr />
                            <div className="card-body-contact">
                                <a href=""> <i class="fab fa-facebook"  style={{color: "blue"}}></i></a>
                                <a href=""> <i class="fab fa-twitter" style={{margin:'0 10px'}}></i></a>
                                <a href=""><i class="fab fa-instagram" style={{color: "pink"}}></i></a>
                            </div>
                            
                        </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} className="jessie-Ca">
                        <Card className={classes.root}>
                        <img className={classes.img} src="img/author-image3.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Jessie Ca</h5>
                            <p className="card-text">Kill him</p>
                            <hr />
                            <div className="card-body-contact">
                                <a href=""> <i class="fab fa-facebook" style={{color: "blue"}}></i></a>
                                <a href=""> <i class="fab fa-twitter" style={{margin:'0 10px'}}></i></a>
                                <a href=""><i class="fab fa-instagram" style={{color: "pink"}}></i></a>
                            </div>
                        </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3} className="andrew-Berti">
                        <Card className={classes.root}>
                        <img className={classes.img} src="img/author-image4.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Andrew Berti</h5>
                            <p className="card-text">Let me alone</p>
                            <hr />
                            <div className="card-body-contact">
                                <a href=""> <i class="fab fa-facebook" style={{color: "blue"}}></i></a>
                                <a href=""> <i class="fab fa-twitter" style={{margin:'0 10px'}}></i></a>
                                <a href=""><i class="fab fa-instagram" style={{color: "pink"}}></i></a>
                            </div>  
                        </div>
                        </Card>
                    </Grid>
                </Grid>
                </Container>
            </div>
           
    )
}
