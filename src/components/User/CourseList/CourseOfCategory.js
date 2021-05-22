import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCourseInItem } from '../../../redux/actions/courseItems';
import CourseItem from './CourseItem'


export default function CourseOfCategory(props) {
    const { category } = props;
    const { courseItem} = useSelector((state) => state.courseItemReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourseInItem(category))
    }, []);

    return (
            <div className="row" className="courseList_tab">
                {courseItem.map((item) => {
                    return (
                        <CourseItem item={item} key={item.maKhoaHoc}></CourseItem>
                    );
                })}
            </div>
    );
}