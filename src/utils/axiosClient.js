import axios from 'axios';


const axiosClient = axios.create({
    baseURL: "https://elearning0706.cybersoft.edu.vn/api"
})
//Tự động thêm authorization vào headers nếu có accexxToken
axiosClient.interceptors.request.use((config) => {
     const user = localStorage.getItem("user");
    if(user){
        const { accessToken } =JSON.parse(user);
        config.headers.common.Authorization = `Bearer ${accessToken}`;
    }
     return config;
})
export default axiosClient;


//  LAM DE TEST KHI CHUA CO CHUC NANG DANG NHAP
// import {BASE_URL, API_TOKEN} from '../redux/constants/common'
// const axiosClient = axios.create({
//     baseURL: BASE_URL
// })
// axiosClient.interceptors.request.use((config) => {
//     config.headers.common.Authorization = `Bearer ${API_TOKEN}`;
//     return config;
// })
// export default axiosClient;