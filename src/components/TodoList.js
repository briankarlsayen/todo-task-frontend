import React, {useState, useEffect, useRef} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import _ from 'lodash'
import TodoListCard from './TodoListCard'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import axios from './axios'
import Loading from './Loading'
import '../styles/TodoList.css'

function TodoList() {
    const {todoheaderid} = useParams()
    const [todoHeader, setTodoHeader] = useState([])
    const [newHeader, setNewHeader] = useState()
    const [todoList, setTodoList] = useState([])
    const [newList, setNewList] = useState([])
    const [onEdit, setOnEdit] = useState(true)
    const [onRedirect, setOnRedirect] = useState(false)
    const focusTitle = useRef(null)
    const [setEditList] = useState('')
    const [arrCompleted, setArrCompleted] = useState([])
    const [arrNotcompleted, setArrNotcompleted] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [done, setDone] = useState(false)
    const [listLoading, setListLoading] = useState(false)

    //focus title upon load
    useEffect(()=> {
        load()
        if(done){
            setOnEdit(true)
            focusTitle.current.focus()
        }
    }, [])

    useEffect(() => {
        if(loading){
            load()  //get todos
        }
        setNewList(todoList)
        setOnRedirect(false)
        if(done){
            todoFilter(newList)//if loading then dont dont separate todolist
            if(onEdit){
                focusTitle.current.focus() //focus on title
            }
        }
    }, [loading, todoList])

    useEffect(()=> {
        setNewHeader(todoHeader)
    }, [done])

    //load the todos
    const load = async () => {
        await axios.get(`/todo/${todoheaderid}/todolist`)
        .then(res => {
            setTodoHeader(res.data[0].header)
            setTodoList(res.data[0].list)
            setLoading(false)
            setDone(true)
        })
        .catch(err => {
            console.log(err.message)
            setError(true)
        })
    }

    const editTodoHeader = async(e) => {
        e.preventDefault()
        setOnEdit(true)
        if(onEdit){
            await axios.put(`todo/${todoheaderid}`, {header: newHeader})
        }
        setLoading(true)
    }
    //submit todoheader either by enter or onblur
    const handleHeaderSubmit = async(e) => {
        e.preventDefault()
        if(onEdit){
            await axios.put(`todo/${todoheaderid}`, {header: newHeader})
        }
        setLoading(true)
        setOnEdit(false)
    }

    const editTodoList = async(id, title, completed) => {
        //edit completed, edit text
        let todolistid = id;
        if(editTodoList){
            await axios.put(`todo/${todoheaderid}/todolist/${todolistid}`, {todo_title: title, todo_completed: completed})
            .then(setListLoading(false))
        }
        setLoading(true)
    }
    
    const deleteTodoList = async(id) => {
        try{ 
            await axios.delete(`todo/${todoheaderid}/todolist/${id}`)
        } catch(err) {
            console.log(err)
        }
        setLoading(true)
    }
    //show list of completed todolist
    const ShowCompleted = () => {
        if(!_.isEmpty(arrCompleted))
        return(
            arrCompleted.map(({todo_completed, todo_date, todo_title, _id}) => {
                return(
                    <TodoListCard key={_id} title={todo_title} date={todo_date} id={_id} completed={todo_completed} loading={listLoading}
                    editTodoList={editTodoList} deleteTodoList={deleteTodoList} setEditList={setEditList} />
                )})
        )
    }
    //show lilst of not completed todolist
    const ShowNotCompleted = () => {
        if(!_.isEmpty(arrNotcompleted))
        return(
            arrNotcompleted.map(({todo_completed, todo_date, todo_title, _id}) => {
                return(
                    <TodoListCard key={_id} title={todo_title} date={todo_date} id={_id} completed={todo_completed} loading={listLoading}
                    editTodoList={editTodoList} deleteTodoList={deleteTodoList} setEditList={setEditList} />
                )})
        )
    }
    //submit todolist either bu enter or onblur
    // const handleSubmit = async e => {
    //     e.preventDefault()
    //     if(addTodoList !== ""){
    //         await axios.post(`/todo/${todoheaderid}/todolist`,{
    //             todo_title: addTodoList     //add todo_title in todo
    //         })
    //     }
    //     setAddTodoList('')
    //     setLoading(true)
    // }

    //add empty todolist
    const addTodoHandler = async() => {
        await axios.post(`/todo/${todoheaderid}/todolist`,{
            todo_title: ''
        })
        setLoading(true)
    }

    //separate the todolist
    const todoFilter = (arr) => {
        const arrComp = []
        const arrNotcomp = []
        for(let i=0;i < arr.length; i++){
            if(arr[i].todo_completed === true){
                arrComp.push(arr[i])
            } else {
                arrNotcomp.push(arr[i])
            }
        }
        setArrCompleted(arrComp)
        setArrNotcompleted(arrNotcomp)
    }

    const ShowData = () => {
        if(done){
            return(
                <div className="todoList__body">
                    {onEdit  ? 
                    <form onBlur={handleHeaderSubmit} onSubmit={handleHeaderSubmit}  className="todoList__title">
                        <input onBlur={()=> setOnEdit(!onEdit)} autoComplete="off" className="todoListCard__edit" ref={focusTitle} id="title" type="text" 
                        value={newHeader} onChange={event => setNewHeader(event.target.value)} />
                        <button className="todoList__saveBtn" type="submit">SAVE</button>
                    </form>
                    :
                    <div className="todoList__title" onClick={editTodoHeader}>
                        <input className="todoListCard__edit" type="text" disabled value={newHeader} />
                        <EditIcon onClick={editTodoHeader}/>
                    </div>
                    }
    
                    {ShowNotCompleted()}
                    <div onClick={addTodoHandler} className="todoList__addBtn">
                        <AddIcon />
                        <p>Add todo</p>
                    </div>
                    {!_.isEmpty(arrCompleted)&& !_.isEmpty(arrNotcompleted) && <div className="todoBreakContainer"><div className="todoBreak"></div></div>}
                    {ShowCompleted()}
                </div>
            )
        }
        else{
            return <Loading />
        }
    }

    return (
        <div className="todoList  paddingSize">
            {
            error ? <p>Unable to get data</p>:
            <>
                {onRedirect ? 
                <Redirect to='/todo' /> //redirect to todo page
                :
                ShowData()
                }
            </>
            }
        </div>
    )
}

export default TodoList
