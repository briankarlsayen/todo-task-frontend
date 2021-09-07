import React, {useEffect, useState} from 'react'
import {Link, useLocation, Redirect} from 'react-router-dom'
import axios from './axios'
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import '../styles/Navbar.css'
import { Tooltip } from '@material-ui/core';

function Navbar() {
    const [path, setPath] = useState()
    const [todoId, setTodoId] = useState()
    let location = useLocation()
    const [todoRedirect, setTodoRedirect] = useState(false)
    const [todoListRedirect, setTodoListRedirect] = useState(false)
    const [callback, setCallback] = useState()
    
    useEffect(()=> {
        setPath(location.pathname.substring(location.pathname.lastIndexOf('/')+1))
        let splitted = location.pathname.split('/')
        let id = splitted[splitted.length -2]
        setTodoId(id)
        setTodoRedirect(false)
        setTodoListRedirect(false)
    },[location])

    useEffect(()=> {
        if(todoId){
            setTodoListRedirect(true)
        }
    }, [callback])

    const deleteTodoHeader = async() => {
        try{
            await axios.delete(`/todo/${todoId}`)
            setTodoRedirect(true)
        } catch(err){
            console.log(err)
        }
    }

    const addTodoHeader = async() => {
        try{
            await axios.post('/todo', {
                header: ''
            })           
            .then(res => {
                setTodoId(res.data._id)
                setCallback(!callback)
            })
        } catch(err){
            console.log(err.message)
        }
    }
    return (
        <div className="navbar ">
            {todoRedirect && <Redirect to='/todo' />}
            {todoListRedirect && todoId && <Redirect to={`/todo/${todoId}/todolist`} />}
            <div className="navbar__logo paddingSize">
                <Link to={'/todo'}><h2 className="logo">Todo Task</h2></Link>
                <div className="navbar__btn">
                    {path === 'todo'? 
                    <Tooltip title="Add Todo">
                        <p><AddIcon onClick={addTodoHeader} /></p>
                    </Tooltip>
                    :
                    <Tooltip title="Delete Todo">
                        <p><ClearIcon onClick={deleteTodoHeader} /></p>
                    </Tooltip>
                    
                    }
                </div>
            </div>   
        </div>
    )
}

export default Navbar
