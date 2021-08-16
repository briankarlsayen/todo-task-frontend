import React, {useState, useEffect, useRef} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function TodoListCard({title, date, completed, id, editTodoList, deleteTodoList, setEditList}) {
    const [editListTitle, setEditListTitle] = useState('') 
    const [onEdit, setOnEdit] = useState(false)
    const [listId, setListId] = useState('')
    const focusListTitle = useRef(null)


    useEffect(()=>{
        focusListTitle.current.focus()  //focus on todolist title
    },[editListTitle])

    const editTitle = (id) => {     //edit todlist title
        setOnEdit(!onEdit)
        setEditListTitle(title)
        setListId(id)
    }

    const handleSubmit = (e) => { //submit edited todolist title
        e.preventDefault()

        if(editListTitle !== ''){
            editTodoList(listId, editListTitle, completed) 
        }
        setOnEdit(false)
    }


    const changeCheck = (id, title, completed) => {
        editTodoList(id, title, !completed)
        setOnEdit(false)
    }

    return (
        <div className="todoListCard">
            <form className="todoListCard__text">
                <input type="checkbox" checked={completed}  onChange={()=> changeCheck(id, title, completed)}/>
                
            </form>
            
            {onEdit ? 
            <form className="todoListCard__editForm" onSubmit={handleSubmit}>
                <input className="todoListCard__edit" ref={focusListTitle} value={editListTitle} onChange={event => setEditListTitle(event.target.value)} />
            </form>
             :
            <>
                <input className="todoListCard__txt" type="text" disabled value={title} className="todoListCard__txt" />
            </>
            }
            
            <p>{completed}</p>
            <div className="todoListCard__btn">
                <EditIcon ref={focusListTitle} onClick={()=> editTitle(id)} />
                <DeleteIcon onClick={() => deleteTodoList(id)} />
            </div>
            
        </div>
    )
}

export default TodoListCard
