import React, {useEffect, useState} from 'react'
import axios from './axios'
import {Link} from 'react-router-dom'
import TodoHeaderCard from './TodoHeaderCard'
import _ from 'lodash'
import moment from 'moment'
import Loading from './Loading'
import '../styles/TodoHeader.css'

function TodoHeader() {
    const [todoList, setTodoList] = useState([])

    const ShowData = () => {
        if(!_.isEmpty(todoList)){
        return(
            todoList.map(({_id, header, createdAt}) => {
                return(
                    <Link key={_id} to={`/todo/${_id}/todolist`}>
                        <TodoHeaderCard  header={header} date={moment(createdAt).format("MMM Do YY")} _id={_id} />
                    </Link>     
                )})
        )}
        else{
            return(
                <Loading />
            )
        }
        
    }
    useEffect(()=> {
        axios.get('/todo')
        .then((res) => setTodoList(res.data))
    },[])
    return (
        <div className="todoHeader paddingSize">
            {ShowData()}
        </div>
    )
}

export default TodoHeader
