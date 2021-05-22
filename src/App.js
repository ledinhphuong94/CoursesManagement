import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from './guards/AdminRoute/index';
import UserRoute from './guards/UserRoute/index'
import UserLayout from './layouts/UserLayout'
import LoginLayout from './layouts/LoginLayout'
import AdminLayout from './layouts/AdminLayout'
import AccountLayout from './layouts/AccountLayout'
import Home from './pages/User/Home'
import CourseDetail from './pages/User/CourseDetail'
import CoursesSearch from './pages/User/CoursesSearch'
import Login from './pages/User/Login'
import RegisterUser from './pages/User/RegisterUser'
import Account from './pages/User/Account'
import UpdateAccountInfo from './pages/User/Account/UpdateAccountInfo'
import './App.css';
// import './styles/css/main.css'
import './styles/scss/main.scss'
import CourseManagement from './pages/Admin/CourseManagement';
import UserManagement from './pages/Admin/UserManagement';
import RegisterManagement from './pages/Admin/RegisterManagement';
import ManageYourCourses from './pages/User/ManageYourCourses'

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <HashRouter> */}
        <switch>
          <Route exact path={["/", "/detail/:courseID","/search/:id", "/search"]}>
            <UserLayout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/detail/:courseID" component = {CourseDetail}/>
                <Route exact path="/search" component = {CoursesSearch}/>
                <Route path="/search/:id" children={<CoursesSearch/>} />
              </Switch>
            </UserLayout>
          </Route>

          <Route exact path={["/login", "/reg-user"]}>
            <LoginLayout>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/reg-user" component={RegisterUser} />
              </Switch>
            </LoginLayout>
          </Route>

          <Route exact path={["/admin","/admin/user", "/admin/course","/admin/register"]}>
            <AdminLayout>
              <Switch>
                <AdminRoute exact path="/admin" component={UserManagement} />
                <AdminRoute exact path="/admin/user" component={UserManagement} />
                <AdminRoute exact path="/admin/course" component={CourseManagement} />
                <AdminRoute exact path="/admin/register" component={RegisterManagement} />
              </Switch>
            </AdminLayout>
          </Route>

          <Route exact path={["/account","/account/course-management","/account/update-account"]}>
          <AccountLayout>
            <Switch>
                <UserRoute exact path="/account" component={Account}/>
                <UserRoute exact path="/account/update-account" component={UpdateAccountInfo}/>
                <UserRoute exact path="/account/course-management" component={ManageYourCourses}/>
            </Switch>
          </AccountLayout>
        
          </Route>

        </switch>
        {/* </HashRouter> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
