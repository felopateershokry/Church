import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyKhodam } from "../assets/assets";
import Card5odam from "../components/Card5odam";
import './List5odam.css'

function List5odam() {
    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    async function fetchallCourses() {
        setAllCourses(dummyKhodam);
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
                        item => item.instructor.name.toLowerCase().includes(input.toLowerCase())
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
                            الخدام
                        </h1>
                        <p className="course-list-breadcrumb">
                            <span className="breadcrumb-home" onClick={() => navigate('/')}>الرئيسية</span> / <span>الخدام</span>
                        </p>
                    </div>
                </div>
                <div className="course-list-grid">
                    {filteredCourses.map((course, index) => (
                        <Card5odam key={index} course={course.instructor} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default List5odam
