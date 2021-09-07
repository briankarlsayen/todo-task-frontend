import React, {useState, useEffect, useRef} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextareaAutosize from 'react-textarea-autosize';

function TodoListCard({title, completed, id, editTodoList, deleteTodoList}) {
    const [onEdit, setOnEdit] = useState(false)
    const [listId, setListId] = useState('')
    const focusListTitle = useRef(null)
    const [newTitle, setNewTitle] = useState(title)

    //trigger when todolist is clicked
    useEffect(()=>{
        if(onEdit){
            moveCursorToEnd(focusListTitle.current)
            function moveCursorToEnd(el) {
                let pos = el.textContent.length
                el.selectionStart = pos
                el.focus();
            }
        }
    },[onEdit])

    const editTitle = (id) => {     //edit todlist title
        setOnEdit(!onEdit)
        setListId(id)
    }

    const handleSubmit = (e) => { //submit edited todolist title
        e.preventDefault()
        if(newTitle !== ''){
            editTodoList(listId, newTitle, completed) 
        }
        setOnEdit(false)
    }


    const changeCheck = (id, title, completed) => {
        editTodoList(id, title, !completed)
        setOnEdit(false)
    }

    const handleBlur = () => {
        setOnEdit(false)
    }

    const showCompleted = () => {
        return(
            <div className="todoListCard">
                <form className="todoListCard__text">
                    <CheckBoxIcon onClick={()=> changeCheck(id, title, completed)} />
                </form>
                {onEdit ? 
                <form className="todoListCard__editForm" onSubmit={handleSubmit} onBlur={handleSubmit}>
                    <TextareaAutosize onBlur={()=> handleBlur()} className="todoListCard__editTodo todoListCard__completed" ref={focusListTitle} 
                    value={newTitle} onChange={event => setNewTitle(event.target.value)} />
                    <div className="todoListCard__btn">
                        <DeleteIcon onMouseDown={() => deleteTodoList(id)} />
                    </div>
                </form> :
                <div className="todoListCard__divTxt" onClick={()=> editTitle(id)}>
                    <TextareaAutosize className="todoListCard__txt todoListCard__completed"  type="text" disabled value={newTitle} />
                </div>          
                }
            </div>
        )
    }

    const showNotCompleted = () => {
        return(
            <div className="todoListCard">
                <form className="todoListCard__text"  >
                    <CheckBoxOutlineBlankIcon onClick={()=> changeCheck(id, title, completed)} />
                </form>
                {onEdit  ? 
                <form className="todoListCard__editForm" onSubmit={handleSubmit} onBlur={handleSubmit}>
                    <TextareaAutosize onBlur={()=> handleBlur()} className="todoListCard__editTodo" ref={focusListTitle} 
                    value={newTitle} onChange={event => setNewTitle(event.target.value)} />
                    
                    <div className="todoListCard__btn">
                        <DeleteIcon onMouseDown={() => deleteTodoList(id)} />
                    </div>
                    
                </form>
                :
                <div className="todoListCard__divTxt" onClick={()=> editTitle(id)}>
                    <TextareaAutosize className="todoListCard__txt" type="text" disabled value={newTitle} />
                </div>
                }
                <p>{completed}</p>
            </div>
        )
    }
    return (
        <div>
            {completed ?
                showCompleted()
            :
                showNotCompleted()
            }
        </div>
        
    )
}

export default TodoListCard
