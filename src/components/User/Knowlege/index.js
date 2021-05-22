import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
export default function Gnowlege() {
    return (
        <div>
            <div className="line-top"></div>
            <section className="question">
                <Container maxWidth="lg" className="p-0">
                    <Grid container direction="row" justify="space-around" alignItems="center" className="">
                        <Grid item className="question-icon">
                            <i className="fa fa-video" />
                        </Grid>
                        <Grid item className="question-icon">
                            <i className="fa fa-share-alt" />
                        </Grid>
                        <Grid item className="question-icon">
                            <i className="fa fa-balance-scale" />
                        </Grid>
                        <Grid item className="question-icon">
                            <i className="fa fa-building" />
                        </Grid>
                        <Grid item className="question-icon">
                            <i className="fab fa-amilia" />
                        </Grid>
                        <Grid className="wid-100" item xs={12} />
                        <Grid item xs={12} md={3}  className="question-icon">
                            <i className="fab fa-first-order-alt" />
                        </Grid>
                        <Grid item xs={12} md={6} className="question-text">
                            <Container maxWidth="md">
                            <Typography variant="h5">Nhận các đề xuất được cá nhân hóa dành cho bạn</Typography>
                            <p>Trả lời một số câu hỏi cho các lựa chọn hàng đầu của bạn
        </p>
                            </Container>     
                            <Link style={{textDecoration:"none"}} to="/search"><Button variant="contained" color="secondary" className="redButton">Bắt đầu</Button></Link>
                        </Grid>
                        <Grid item xs={12} md={3} className="question-icon">
                            <i className="fa fa-paint-brush" />
                        </Grid> 
                        <Grid className="wid-100" item xs={12}/>
                        <Grid item className="question-icon">
                            <i className="fa fa-print" />
                        </Grid>
                        <Grid className="question-icon">
                            <i className="fa fa-chart-line" />
                        </Grid>
                        <Grid className="question-icon">
                            <i className="fa fa-chart-bar" />
                        </Grid>
                        <Grid className="question-icon">
                            <i className="fa fa-chess-knight" />
                        </Grid>
                        <Grid className="question-icon">
                            <i className="fa fa-child" />
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </div>
    )
}
