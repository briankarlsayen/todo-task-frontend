import React from 'react'

function TodoListCard({title, date, completed, id}) {
    return (
        <div className="todoListCard">
            <h2>{title}</h2>
            <p>{completed}</p>
        </div>
    )
}

export default TodoListCard
