import '../styles/TodoHeaderCard.css'

function TodoHeaderCard(props) {
    return (
        <div className="todoHeaderCard">
            <div className="todoHeaderCard__container">
                <h2 className="todoHeaderCard__header">{props.header}</h2>
                <h4 className="todoHeaderCard__subheader">{props.date}</h4>
            </div>
            
        </div>
    )
}

export default TodoHeaderCard
