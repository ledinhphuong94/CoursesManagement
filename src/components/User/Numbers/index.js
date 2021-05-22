import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Numbers() {
    const [move, setMove] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window.outerWidth)
    const feedBackContent = [
        {
            id: 1,
            img: '/img/ava1.jpg',
            name: "Trần Minh",
            content: "Tôi không có thời gian và tiền bạc để học đại học. Mục tiêu của tôi là trở thành một người lập trình web tự do, và nhờ có Steven, tôi thực sự đã đạt được mục tiêu.",
        },
        {
            id: 2,
            img: '/img/ava2.jpg',
            name: "Huyền Cơ",
            content: "Học, học nữa, học mãi và Steven là một nơi tuyệt vời để giúp mình thực hiện được châm ngôn đó. Mình đã học được rất nhiều và giới thiệu nó cho tất cả bạn bè của mình",
        },
        {
            id: 3,
            img: '/img/ava3.jpg',
            name: "Cẩm Tiên",
            content: "Các con của tôi và tôi YÊU Steven! Các khóa học thật tuyệt vời và các giảng viên rất vui vẻ và trình độ cao. Tôi chỉ ước chúng tôi tìm thấy nó sớm hơn.",
        },
        {
            id: 4,
            img: '/img/ava1.jpg',
            name: "Trần Bình",
            content: "Rất hay và bổ ích",
        },
        {
            id: 5,
            img: '/img/ava2.jpg',
            name: "Minh Phương",
            content: "Đừng bao giờ thay đổi mình vì người khác. Nếu họ không thể tiếp nhận một con người nhiều điểm xấu là bạn, thì cũng không xứng để có được một con người với nhiều điểm tốt là bạn.",
        },
        {
            id: 6,
            img: '/img/ava1.jpg',
            name: "Thu Hà",
            content: "Bạn cần sức mạnh, nghị lực nên cuộc sống đã đặt ra những khó khăn nghịch cảnh để bạn vượt qua và trở nên mạnh mẽ hơn",
        },
        {
            id: 7,
            img: '/img/ava2.jpg',
            name: "Bé Tí",
            content: "Hãy cảm ơn những lúc bạn gặp khó khăn, bởi nếu không có khó khăn, bạn sẽ không có cơ hội để hiểu mình và trải nghiệm cuộc sống.",
        }
    ]
    let itemDom = document.getElementsByClassName("item")
    Array.from(itemDom).forEach(item => {
        item.style.transform = `translateX(${100 * move}%)`
    })
    window.addEventListener("resize", (e)=>{
        setWindowWidth(e.target.outerWidth)
    });
    // Responsive
    let numberOfItems = 3;
    if(windowWidth > 992){
        numberOfItems = 3;
    }else if(windowWidth <= 992 && windowWidth > 576){
        numberOfItems = 2;
    }else if(windowWidth < 576){
        numberOfItems = 1;
    }
    // Responsive
    const handleCarousel = (value) => {
        if (value === "right") {
            if (move > -(feedBackContent.length - numberOfItems)) {
                setMove(move - 1)
            }
        }
        if (value === "left") {
            if(move < 0){
                setMove(move + 1)
            }
        }
    }
    return (
        <section id="students" className="testimonial">
            <div className="feedback">
                <Typography className="feedback__title" variant="h2" align="center">Cảm nghĩ của học viên</Typography>
                <div className="feedback_content">
                    {feedBackContent.map((item, index) => {
                        return (
                            <React.Fragment key={index} >
                                <div id={`item${item.id}`} className="item">
                                    <div class="miniItem">
                                        <img src={item.img} alt />
                                        <b>{item.id}. {item.name}</b>
                                        <p>{item.content}</p>
                                    </div>
                                    
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                {move > -(feedBackContent.length-numberOfItems)?<IconButton id="button2" className="button" variant="contained" color="primary" onClick={() => handleCarousel("right")}>
                    <ChevronRightIcon fontSize="inherit" />
                </IconButton>:null}
                {move < 0? <IconButton id="button1" className="button" variant="contained" color="primary" onClick={() => handleCarousel("left")}>
                    <ChevronLeftIcon fontSize="inherit" />
                </IconButton>:null}          
            </div>
            <div className="testimonial_companies">
                <Container maxWidth="lg">
                    <Box p={8}>
                    <Typography className="titleNumber" variant="h5" align="center">HỢP TÁC VỚI NHỮNG CÔNG TY HÀNG ĐẦU</Typography>
                    </Box>
                    <Grid container justify="space-around" className="companies_logo" spacing={3} >
                        <Grid item>
                            <img src="./img/booking.svg" alt />
                        </Grid>
                        <Grid item>
                            <img src="./img/mercedes.svg" alt />
                        </Grid>
                        <Grid item>
                            <img src="./img/volkswagen.svg" alt />
                        </Grid>
                        <Grid item>
                            <img src="./img/pinterest.svg" alt />
                        </Grid>
                        <Grid item>
                            <img src="./img/adidas.svg" alt />
                        </Grid>
                        <Grid item>
                            <img src="./img/paypal.svg" alt />
                        </Grid>
                    </Grid>
                    <Grid container className="moreInfo" spacing={5}>
                        <Grid item xs={12} md={6} className="moreInfo__item">
                            <h4>Trở thành giảng viên</h4>
                            <p>Các giảng viên hàng đầu từ khắp nơi trên thế giới dạy hàng triệu học viên trên Steven. Chúng tôi cung cấp các công cụ để bạn dạy những gì bạn yêu thích.</p>
                            <Button className="redButton" variant="outlined" color="secondary">Cộng tác ngay hôm nay</Button>
                        </Grid>
                        <Grid item xs={12} md={6} className="moreInfo__item">
                            <h4>Steven cho Doanh nghiệp</h4>
                            <p>Nhận quyền truy cập không giới hạn vào hơn 4.000 khóa học hàng đầu của Steven cho nhóm của bạn.</p>
                            <Button className="redButton" variant="outlined" color="secondary">Đăng ký Steven cho Doanh nghiệp</Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </section>

    )
}