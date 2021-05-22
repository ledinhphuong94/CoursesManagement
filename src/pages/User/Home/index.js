import React from 'react'

import Carousel from '../../../components/User/Carousel'
import Categories from '../../../components/User/Categories'
import CourseList from '../../../components/User/CourseList'
import TopCourses from '../../../components/User/TopCourses'
import Contact from '../../../components/User/Contact'
import Knowlege from '../../../components/User/Knowlege'
import Numbers from '../../../components/User/Numbers'
import Teachers from '../../../components/User/Teachers'


export default function Home() {
    return (
        <div>
            <Carousel/>
            <Categories/>
            <CourseList/>
            <TopCourses/>
            <Contact/>
            <Knowlege/>
            <Numbers/>
            <Teachers />
        </div>
    )
}
