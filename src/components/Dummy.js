import React, {useEffect} from 'react'
import { fetchTodos } from '../reducers/todoSlice'
import { useDispatch, useSelector } from 'react-redux'

function Dummy() {
    const getTodos = useSelector(state => state.fetchTodos)
    
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchTodos())
    }, [])
    console.log(getTodos)
    return (
        <div>
            Dummy
        </div>
    )
}

export default Dummy
