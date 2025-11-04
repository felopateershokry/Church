import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SinglePage.css";
import { fetchPersonById } from '../utils/api';
import { assets } from '../assets/assets';
import { getAttendanceCount, markAttendance, unmarkAttendance } from '../utils/attendance';

const SinglePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [attendanceCount, setAttendanceCount] = useState(0);

    useEffect(() => {
        async function fetchStudent() {
            try {
                setLoading(true);
                const person = await fetchPersonById(id);
                if (person) {
                    // Map backend data structure to frontend expected format
                    setStudentData({
                        _id: person.id,
                        name: person.name,
                        imageUrl: person.imageUrl || assets.home,
                        phone: person.phone || '',
                        address: person.address || '',
                        date: person.date || '',
                        attendance: person.attendance || 'absent'
                    });
                } else {
                    setStudentData(null);
                }
            } catch (error) {
                console.error('Error fetching student:', error);
                setStudentData(null);
            } finally {
                setLoading(false);
            }
        }
        fetchStudent();
    }, [id]);

    useEffect(() => {
        const loadAttendance = async () => {
            if (id) {
                const count = await getAttendanceCount(id);
                setAttendanceCount(count);
            }
        };
        loadAttendance();

        // Refresh attendance periodically (every 3 seconds) to sync with other users
        const refreshInterval = setInterval(loadAttendance, 3000);
        
        return () => {
            clearInterval(refreshInterval);
        };
    }, [id]);

    const handleMarkAttendance = async (e) => {
        e.stopPropagation();
        if (id) {
            const newCount = await markAttendance(id);
            setAttendanceCount(newCount);
        }
    };

    const handleUnmarkAttendance = async (e) => {
        e.stopPropagation();
        if (id) {
            const newCount = await unmarkAttendance(id);
            setAttendanceCount(newCount);
        }
    };

    if (loading) {
        return (
            <div className="single-container">
                <h2>جاري التحميل...</h2>
            </div>
        );
    }

    if (!studentData) {
        return (
        <div className="single-container">
            <h2>البيانات غير موجودة</h2>
            <button onClick={() => navigate("/list")} className="back-btn">
            العودة إلى القائمة
            </button>
        </div>
        );
    }

    return (
        <div className="single-container">
        <div className="single-card">
            <img
            src={studentData.imageUrl}
            alt={studentData.name}
            className="student-img"
            />
            <div className="student-info">
            <h1 className="student-name">{studentData.name}</h1>
            <p><span> الهاتف:</span> {studentData.phone}</p>
            <p><span> العنوان:</span> {studentData.address}</p>
            <p><span> تاريخ الميلاد:</span> {studentData.date}</p>
            
            <div className="attendance-section">
                <p className="attendance-count">
                    <span>عدد الحضور:</span> {attendanceCount}
                </p>
                <div className="attendance-buttons">
                    <button className="attendance-btn" onClick={handleMarkAttendance}>
                        ✓ تسجيل حضور
                    </button>
                    <button 
                        className="attendance-btn-minus" 
                        onClick={handleUnmarkAttendance}
                        disabled={attendanceCount === 0}
                    >
                        - إلغاء حضور
                    </button>
                </div>
            </div>

            <button className="back-btn" onClick={() => navigate("/list")}>
                ⬅ العودة إلى القائمة
            </button>
            </div>
        </div>
        </div>
    );
};

export default SinglePage;
