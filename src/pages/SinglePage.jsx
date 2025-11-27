import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SinglePage.css";
import { assets, dummyData } from './../assets/assets';

const SinglePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const studentData = dummyData.find((item) => item.student._id === id)?.student;

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
                <p>
                        <span> الهاتف:</span> 
                        {studentData.phone}
                        <a href={`tel:${studentData.phone}`} target="_blank" rel="noopener noreferrer" className="whatsapp-icon">
                            <img src={assets.call} alt="call" width="22" height="22"/>
                    </a>
                    <a href={`https://wa.me/20${studentData.phone}`} target="_blank" rel="noopener noreferrer"  className="whatsapp-icon">
                        <img src={assets.whatsapp} alt="WhatsApp" width="22" height="22"/>
                    </a>
                </p>

                <p><span> العنوان:</span> {studentData.address}</p>
                <p><span> تاريخ الميلاد:</span> {studentData.date}</p>

                <button className="back-btn" onClick={() => navigate("/list")}>
                    ⬅ العودة إلى القائمة
                </button>
            </div>

        </div>
        </div>
    );
};

export default SinglePage;
