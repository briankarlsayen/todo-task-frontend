import React, {useState, useEffect, useRef} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import _ from 'lodash'
import TodoListCard from './TodoListCard'
import axios from './axios'
import '../styles/TodoList.css'
function TodoList() {
    const {todoheaderid} = useParams()
    const [todoHeader, setTodoHeader] = useState('')
    const [todoList, setTodoList] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [onRedirect, setOnRedirect] = useState(false)
    const focusTitle = useRef(null)

    useEffect(() => {
        load()
        setOnRedirect(false)
        focusTitle.current.focus() //focus on title
    }, [onEdit])

    const deleteTodoHeader = async() => {
        try{
            await axios.delete(`/todo/${todoheaderid}`)
            setOnRedirect(true)
        } catch(err){
            console.log(err)
        }
    }

    const editTodoHeader = async() => {
        setOnEdit(!onEdit)
        if(onEdit){
            await axios.put(`todo/${todoheaderid}`, {header: todoHeader})
        }
    }

    const ShowData = () => {
        if(!_.isEmpty(todoList))
        return(
            todoList.map(({todo_completed, todo_date, todo_title, _id}) => {
                return(
                    <TodoListCard key={_id} title={todo_title} date={todo_date} id={_id} completed={todo_completed} />
                )})
        )
    }

    const load = async () => {
        await axios.get(`/todo/${todoheaderid}/todolist`)
        .then(res => {
            setTodoHeader(res.data[0].header)
            setTodoList(res.data[0].list)
        })
    }

    return (
        <div className="todoList">
            {onRedirect ? 
            <Redirect to='/todo' /> //redirect to todo page
            :
            <div className="todoList__body">
                <div className="todoList__title">
                    <input ref={focusTitle} id="title" type="text" value={todoHeader} disabled={!onEdit} onChange={event => setTodoHeader(event.target.value)} />
                    <div className="todoList__btn">
                        <button onClick={editTodoHeader}>Edit</button>
                        <button onClick={deleteTodoHeader}>Delete</button>
                    </div>
                </div>
                {ShowData()}
            </div>
            }
        </div>
    )
}

export default TodoList
