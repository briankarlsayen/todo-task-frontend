import React, {useState, useEffect, useRef} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import _ from 'lodash'
import TodoListCard from './TodoListCard'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from './axios'
import '../styles/TodoList.css'

function TodoList() {
    const {todoheaderid} = useParams()
    const [todoHeader, setTodoHeader] = useState('')
    const [todoList, setTodoList] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [onRedirect, setOnRedirect] = useState(false)
    const focusTitle = useRef(null)
    const [callback, setCallback] = useState(false)
    const [addTodoList, setAddTodoList] = useState('')
    const [setEditList] = useState('')

    useEffect(() => {
        load()  //get todos
        setOnRedirect(false)
        focusTitle.current.focus() //focus on title
    }, [callback])

    const deleteTodoHeader = async() => {
        try{
            await axios.delete(`/todo/${todoheaderid}`)
            setOnRedirect(true)
        } catch(err){
            console.log(err)
        }
        setCallback(!callback)
    }

    const editTodoHeader = async() => {
        setOnEdit(!onEdit)
        if(onEdit){
            await axios.put(`todo/${todoheaderid}`, {header: todoHeader})
        }
        setCallback(!callback)
    }

    const editTodoList = async(id, title, completed) => {
        let todolistid = id;
        if(editTodoList){
            await axios.put(`todo/${todoheaderid}/todolist/${todolistid}`, {todo_title: title, todo_completed: completed})
        }
        setCallback(!callback)
    }
    
    const deleteTodoList = async(id) => {
        try{ 
            await axios.delete(`todo/${todoheaderid}/todolist/${id}`)
        } catch(err) {
            console.log(err)
        }
        setCallback(!callback)
    }

    const ShowData = () => {
        if(!_.isEmpty(todoList))
        return(
            todoList.map(({todo_completed, todo_date, todo_title, _id}) => {
                return(
                    <TodoListCard key={_id} title={todo_title} date={todo_date} id={_id} completed={todo_completed} editTodoList={editTodoList} deleteTodoList={deleteTodoList} setEditList={setEditList} />
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

    const handleSubmit = async e => {
        e.preventDefault()
        if(addTodoList !== ""){
            await axios.post(`/todo/${todoheaderid}/todolist`,{
                todo_title: addTodoList     //add todo_title in todo
            })
        }
        setAddTodoList('')
        setCallback(!callback)
    }

    return (
        <div className="todoList  paddingSize">
            {onRedirect ? 
            <Redirect to='/todo' /> //redirect to todo page
            :
            <div className="todoList__body">
                <div className="todoList__title">
                    <input ref={focusTitle} id="title" type="text" value={todoHeader} disabled={!onEdit} onChange={event => setTodoHeader(event.target.value)} />
                    <div className="todoList__btn">
                        <EditIcon onClick={editTodoHeader}/>
                        <DeleteIcon onClick={deleteTodoHeader}/>
                    </div>
                </div>
                <div>
                    <form className="todoList__form" onSubmit={handleSubmit}>
                        <input className="todoList__txt" required type="text" placeholder='input todo list here' value={addTodoList} onChange={e => setAddTodoList(e.target.value)} />
                        <AddIcon className="todoList__formBtn" type="submit" onClick={handleSubmit}/>
                    </form>
                </div>
               
                {ShowData()}
            </div>
            }
        </div>
    )
}

export default TodoList
