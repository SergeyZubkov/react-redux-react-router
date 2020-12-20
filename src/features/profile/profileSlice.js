import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: null,
    status: 'idle',
    error: null
}

export const fetchUserById = createAsyncThunk('fetchUserById', async (id, {rejectWithValue}) => {
    let res = await fetch("https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/" + id)
    res = await res.json()

    return res.status === 'ok' ? res.data : rejectWithValue(res.message)
})

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserById.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchUserById.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [fetchUserById.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export default profileSlice.reducer