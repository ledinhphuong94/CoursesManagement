import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';

export default function Carousel() {
    const [color, setColor] = useState('#f00')
    const handleChange = (evt) => {
        setColor(evt.target.value)
    }
    const useStyle = makeStyles((theme) => ({
        label: {
            color: color,
        },
        button: {
            margin: theme.spacing(1),
        },
        text1:{
            color: 'white'
        },
        text2:{
            color: 'black'
        }
    }));


    const classes = useStyle();


    // render() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">

                <div className="carousel-item active">
                    <img className="d-block w-100" src="img/slide1.jpg" alt="First slide" />
                    <div className="carousel-info">
                        <h2 className={classes.text1}>Hãy khám phá các khóa học</h2>
                        <p className={classes.text1}>Hãy trang bị kiến thức để sẵn sàng trong tương lai bằng các khóa học chất lượng. Bạn sẽ đạt được ước mơ nghề nghiệp của mình.</p>
                        <p className={classes.text1}>Hãy thử ngay hôm nay.</p>
                        <Button variant="outlined" color="primary" className={classes.label}>Tham gia</Button>
                        <Button
                            variant="contained"

                            color="secondary"
                            className={classes.button}
                            startIcon={<KeyboardVoiceIcon />}
                        >
                            Trò chuyện
                        </Button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="img/cover.jpg" alt="Second slide" />
                    <div className="carousel-info">
                        <h2 className={classes.text1}>Học, học nữa, học mãi</h2>
                        <p className={classes.text1}>Đừng bao giờ bỏ lỡ cơ hội được học của bạn với những khóa học chất lượng, đội ngũ giảng viên chuyên nghiệp. Kiến thức sẽ là thứ giúp chúng ta tồn tại</p>
                        <p className={classes.text1}>Đừng chần chờ nữa.</p>
                        <Button variant="contained" color="primary">Tham gia</Button>
                        <Button
                            variant="contained"

                            color="secondary"
                            className={classes.button}
                            startIcon={<KeyboardVoiceIcon />}
                        >
                            Trò chuyện
      </Button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="img/cathy-bg2.jpg" alt="Third slide" />
                    <div className="carousel-info">
                        <h2>Bạn yêu thích lập trình ?</h2>
                        <p>Tại Steven, chúng tôi có vô vàn các khóa học để bạn lựa chọn từ lập trình, dạy nấu ăn cho đến quản lý doanh nghiệp. Hãy xây dựng một nền tảng vững chắc cho bản thân.</p>
                        <p>Hãy thử ngay hôm nay.</p>
                        <Button variant="outlined" color="primary" className={classes.label}>Tham gia</Button>
                        <Button
                            variant="contained"

                            color="secondary"
                            className={classes.button}
                            startIcon={<KeyboardVoiceIcon />}
                        >
                            Trò chuyện
      </Button>

                    </div>
                </div>

            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
    // }
}