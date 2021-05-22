import { combineReducers } from "redux";
import courseReducer from './Courses';
import loginReducer from './login';
import registerReducer from './Register';
import courseItemReducer from './courseItem';
import addCoursesReducer from './Admin/addCourses';
import courseSignUpReducer from './User/DangKyKhoaHoc';
import userAccountReducer from './User/ThongTinTaiKhoan';
import deleteCoursesReducer from './User/DeleteCourses';
import userUpdateReducer from './User/userUpdate';
import itemOfCourseReducer from './User/getItemsOfCourse';
import getCourseInfoReducer from './Admin/getCoursesInfo';
import updateCourseReducer from './Admin/updateCourses';
import deleteCoursesAdminReducer from './Admin/deleteCourses';
import getStudentInfoByCourseReducer from './Admin/takeInfoOfStudent'
import categoriesReducer from './Categories'
import upLoadImageCourseReducer from './Admin/uploadImageCourse';
import getUserListReducer  from './Admin/userList';
import searchUserReducer from './Admin/searchUser';
import addUserReducer from './Admin/addUser';
import deleteUserReducer from './Admin/deleteUser';
import commonUserReducer from './User/Common'
import courseDetailReducer from './User/CourseDetail'
import getCoursesAwaitApproveReducer from './Admin/getCoursesAwaitApprove'
import approveCoursesReducer from './Admin/approveCourses'
import getApprovedCoursesReducer from './Admin/getApprovedCourses'
import getApprovedUserListReducer from './Admin/getApprovedUserList'
import userApprovedCoursesReducer from './User/getApprovedCourses'
import getLinkReducer from './getLink'
const rootReducer = combineReducers ({
    courseReducer,
    loginReducer,
    registerReducer,
    courseItemReducer,
    courseDetailReducer,
    addCoursesReducer,
    courseSignUpReducer,
    userAccountReducer,
    deleteCoursesReducer,
    userUpdateReducer,
    itemOfCourseReducer,
    getCourseInfoReducer,
    updateCourseReducer,
    deleteCoursesAdminReducer,
    getStudentInfoByCourseReducer,
    categoriesReducer,
    upLoadImageCourseReducer,

    getUserListReducer,
    searchUserReducer,
    addUserReducer,
    deleteUserReducer,

    commonUserReducer,

    getCoursesAwaitApproveReducer,
    approveCoursesReducer,
    getApprovedCoursesReducer,
    getApprovedUserListReducer,
    userApprovedCoursesReducer,
    getLinkReducer

})

export default rootReducer;