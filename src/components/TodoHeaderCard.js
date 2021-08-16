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
