import React,{useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 130,
    },
    background:{
        backgroundColor:'#fff',
        color:'white'
    }
   
  }));

export default function Footer() {
    const classes = useStyles();
    const [language,setLanguage] = useState("vietnam")
    console.log(language)
    return (
        <footer className={classes.background}>
            <Grid container className="border-bottom pb-3">
                <Grid container item xs={12} sm={9} className="footer__content" justify="space-around">
                    <Grid item xs={12} sm={4} className="footer__item">
                        <a href="#" className="link-active">Steven cho Doanh nghiệp</a>
                        <a href="#" className="link-active">Dạy trên Steven</a>
                        <a href="#">Ứng dụng Steven</a>
                        <a href="#">Về chúng tôi</a>
                    </Grid>
                    <Grid item xs={12} sm={4} className="footer__item">
                        <a href="#">Liện hệ</a>
                        <a href="#">Tuyển dụng</a>
                        <a href="#">Blog</a>
                        <a href="#">Hỗ trợ</a>
                    </Grid>
                    <Grid item xs={12} sm={4} className="footer__item">
                        <a href="#">Liên kết</a>
                        <a href="#">Sitemap</a>
                        <a href="#">Các khóa học</a>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={3}>
                    <div className="btn-group dropup">
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="select-languages-title">
                                <i className="fa fa-globe-americas" /> Languages
                            </InputLabel>
                            <Select
                                labelId="select-languages-title"
                                id="select-languages"
                                value={language}
                                onChange={(evt)=> {setLanguage(evt.target.value)}}
                                label="Language"
                            >
                                <MenuItem value={"english"}>English</MenuItem>
                                <MenuItem value={"vietnam"}>Tiếng Việt</MenuItem>
                                <MenuItem value={"chinese"}>Trung Quốc</MenuItem>
                                <MenuItem value={"thailand"}>Thái Lan</MenuItem>
                                <MenuItem value={"deutsch"}>Hà Lan</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            
            <Grid container justify="space-between" className="copyright">
                <Grid item>
                    <img src="/img/logo2.png" width="60px"/>
                    <small style={{display:'inline-block',padding:'10px'}}> Copyright © 2021 Steven, Inc.</small>
                </Grid>
                <Hidden xsDown>
                    <Grid item>
                        <a href="#">Điều khoản</a>
                        <a href="#">Chính sách về quyền riêng tư</a>
                    </Grid>
                </Hidden>
            </Grid>
        </footer>

    )
}
