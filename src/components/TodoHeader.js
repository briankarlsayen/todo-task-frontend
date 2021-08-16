import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import TodoHeaderCard from './TodoHeaderCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../reducers/todoSlice'
import _ from 'lodash'
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment'
import '../styles/TodoHeader.css'
import axios from './axios';

function TodoHeader(props) {
    const [addTodo, setAddTodo] = useState('')
    const [callback, setCallback] = useState(false)
    const todoList = useSelector(state => state.fetchTodos)
    const dispatch = useDispatch();

    const ShowData = () => {
        if(!_.isEmpty(todoList.list)){
        return(
            todoList.list.map(({_id, header, createdAt}) => {
                return(
                    <Link key={_id} to={`/todo/${_id}/todolist`}>
                        <TodoHeaderCard  header={header} date={moment(createdAt).format("MMM Do YY")} _id={_id} />
                    </Link>     
                )})
        )}
        
        if(todoList.pending) {
            return <p>Loading...</p>
        }
        if(todoList.rejected !== "") {
            return <p>{todoList.status}</p>
        }
        return <p>error getting todos</p>
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await axios.post('/todo',{
            header: addTodo
        })
        setAddTodo('')
        setCallback(!callback)
    }

    useEffect(()=> {
        dispatch(fetchTodos())
    },[callback])

    const formatDate = (d) => {
        //let result = moment(d).format('MMMM Do YYYY, h:mm:ss a');
        let result = moment(d, "YYYYMMDD").fromNow();

        console.log(result)
    }

    return (
        <div className="todoHeader paddingSize">
            <form className="todoHeader__form" onSubmit={handleSubmit}>
                <input className="todoHeader__txt" placeholder="Add todo" value={addTodo} type="text" onChange={e => setAddTodo(e.target.value)} />
                <AddIcon className="todoHeader__btn" type="submit" onClick={handleSubmit}/>
            </form>
            {ShowData()}
        </div>
    )
}

export default TodoHeader
