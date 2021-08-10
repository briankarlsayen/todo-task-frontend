import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <Link to={'/todo'}><h2>Task List</h2></Link>
            </div>
        </div>
    )
}

export default Navbar
