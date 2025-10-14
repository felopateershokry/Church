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
            <Link to={"/list"}>
                <button className="home-button">
                    ابدا
                </button>
            </Link>
        </div>
    )
}

export default Home
