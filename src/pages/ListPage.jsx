import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyData } from '../assets/assets';
import CourseCard from '../components/CourseCard';
import './listPage.css'

function ListPage() {

    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    async function fetchallCourses() {
        setAllCourses(dummyData);
    }

    const { input } = useParams();
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        fetchallCourses();
    }, []);


    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            const tempCourses = allCourses.slice();
            input ? 
                setFilteredCourses(
                    tempCourses.filter(
                        item => item.student.name.toLowerCase().includes(input.toLowerCase())
                    )
                )
                : setFilteredCourses(tempCourses);
        }
    }
    , [allCourses, input]);


    return (
        <>
            <div className="course-list-container">
                <div className="course-list-header">
                    <div>
                        <h1 className="course-list-title">
                            المخدومين
                        </h1>
                        <p className="course-list-breadcrumb">
                            <span className="breadcrumb-home" onClick={() => navigate('/')}>الرئيسية</span> / <span>المخدومين</span>
                        </p>
                    </div>
                </div>
                <div className="course-list-grid">
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={index} course={course.student} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ListPage
