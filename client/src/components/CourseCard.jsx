import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAttendanceCount, markAttendance, unmarkAttendance } from '../utils/attendance';
import './CourseCard.css'

const CourseCard = ({ course }) => {
    const [attendanceCount, setAttendanceCount] = useState(0);

    useEffect(() => {
        const updateAttendance = async () => {
            if (course && course._id) {
                const count = await getAttendanceCount(course._id);
                setAttendanceCount(count);
            }
        };

        updateAttendance();

        // Refresh attendance periodically (every 3 seconds) to sync with other users
        const refreshInterval = setInterval(updateAttendance, 3000);

        // Refresh attendance when window gains focus (e.g., returning from SinglePage)
        window.addEventListener('focus', updateAttendance);
        
        return () => {
            clearInterval(refreshInterval);
            window.removeEventListener('focus', updateAttendance);
        };
    }, [course]);

    const handleMarkAttendance = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (course && course._id) {
            const newCount = await markAttendance(course._id);
            setAttendanceCount(newCount);
        }
    };

    const handleUnmarkAttendance = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (course && course._id) {
            const newCount = await unmarkAttendance(course._id);
            setAttendanceCount(newCount);
        }
    };

    return (
        <div className="course-card-wrapper">
            <Link to={'/single/' + course._id} onClick={() => scrollTo(0, 0)} className="course-card">
                <img src={course.imageUrl} alt="" />
                <div className="card-body">
                    <h3>{course.name}</h3>
                    <div className="attendance-badge">
                        الحضور: {attendanceCount}
                    </div>
                </div>
            </Link>
            <div className="card-attendance-controls" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="card-btn card-btn-plus" 
                    onClick={handleMarkAttendance}
                    title="تسجيل حضور"
                >
                    +
                </button>
                <button 
                    className="card-btn card-btn-minus" 
                    onClick={handleUnmarkAttendance}
                    disabled={attendanceCount === 0}
                    title="إلغاء حضور"
                >
                    -
                </button>
            </div>
        </div>
    )
}

export default CourseCard
