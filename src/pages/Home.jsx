import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <h1 className='title'>اسرة الانبا موسى الاسود</h1>
            <h2 className='subtitle'>اسرة تانية ثانوي</h2>
            <div className="home-image">
                <img src={assets.home} alt="" />
            </div>
            <div className='btns'>
                <Link to={"/list-khodam"}>
                    <button className="home-button">
                        الخدام
                    </button>
                </Link>
                <Link to={"/list"}>
                    <button className="home-button">
                        المخدومين
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home
