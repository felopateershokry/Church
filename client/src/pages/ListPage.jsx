import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPeople } from '../utils/api';
import CourseCard from '../components/CourseCard';
import { assets } from '../assets/assets';
import './listPage.css'

function ListPage() {

    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function fetchallCourses() {
        try {
            setLoading(true);
            const people = await fetchPeople();
            // Map backend data structure to frontend expected format
            const mappedData = people.map(person => ({
                student: {
                    _id: person.id,
                    name: person.name,
                    imageUrl: person.imageUrl || assets.home,
                    phone: person.phone || '',
                    address: person.address || '',
                    date: person.date || '',
                    attendance: person.attendance || 'absent'
                }
            }));
            setAllCourses(mappedData);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setAllCourses([]);
        } finally {
            setLoading(false);
        }
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
        } else {
            setFilteredCourses([]);
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
                    {loading ? (
                        <div>جاري التحميل...</div>
                    ) : filteredCourses.length > 0 ? (
                        filteredCourses.map((course, index) => (
                            <CourseCard key={course.student._id || index} course={course.student} />
                        ))
                    ) : (
                        <div>لا توجد بيانات</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ListPage
