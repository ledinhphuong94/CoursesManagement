import React from 'react';
import { Route,Redirect} from "react-router-dom";
import { connect } from "react-redux";

//<Admin 
//higher order component: là 1 function hoặc component nhần vào 1 tham số là 1 component khác
function AdminRoute(props) {
    const { component: Component, currentUser, ...routerProps } = props;
    //currentUser: là children
    //routerProps => {exact, path}
    // render() {
    return <Route {...routerProps} render={(props) => {
        if (currentUser) {
            //Đã đăng nhập
            if (currentUser.maLoaiNguoiDung === "GV") {
                return <Component {...props}/> //Lấy các props history, location, match
            }
            //Đã đăng nhập nhưng không là giảng viên
            return <Redirect to="/coursesDetail" />
        }
        //Chưa đăng nhập
        return <Redirect to="/login" />
        // return <Component {...props}/>
    }} />
    // }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.loginReducer.currentUser,
    };
};

export default connect(mapStateToProps)(AdminRoute)
