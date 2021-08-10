import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../components/axios'


export const fetchTodos = createAsyncThunk(
    "posts/fetchPokemons", async (_, thunkAPI) => {
       try {
          //const response = await fetch(`url`); //where you want to fetch data
          //Your Axios code part
          const response = await axios.get('/todo');//where you want to fetch data
          
          return await response.data
        } catch (error) {
           return thunkAPI.rejectWithValue({ error: error.message });
        }
  });

const initialState = {
    list: {}
}

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.status = 'loading'
            state.list = ''
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'success'
            state.list = action.payload
            console.log(action.payload)
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'failed to get todos'
            state.list = ''
        }
    }
})

export default pokemonSlice.reducer