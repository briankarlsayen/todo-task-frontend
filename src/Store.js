import { configureStore } from '@reduxjs/toolkit'
import fetchTodos from './reducers/todoSlice'

const Store = configureStore({
  reducer: {
    fetchTodos
  }
})

export default Store