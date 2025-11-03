import React from 'react'
import { Link } from 'react-router-dom';
import './CourseCard.css'

const CourseCard = ({ course }) => {

    return (
        <Link to={'/single-khodam/' + course._id} onClick={() => scrollTo(0, 0)} className="course-card">
            <img src={course.imageUrl} alt="" />
            <div className="card-body">
                <h3>{course.name}</h3>
            </div>
        </Link>

    )
}

export default CourseCard
