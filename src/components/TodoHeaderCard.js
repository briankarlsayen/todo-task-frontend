import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/TodoHeaderCard.css'

function TodoHeaderCard(props) {
    return (
        <div className="todoHeaderCard">
            <h2>{props.header}</h2>
            <h4>{props.date}</h4>
        </div>
    )
}

export default TodoHeaderCard
