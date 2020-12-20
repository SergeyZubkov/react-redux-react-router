import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchNews = createAsyncThunk('fetchNews', async (_, {rejectWithValue}) => {
    let res = await fetch(`https://mysterious-reef-29460.herokuapp.com/api/v1/news`)
    res = await res.json()

    return res.status === 'ok' ? res.data : rejectWithValue(res.error)
})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNews.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNews.fulfilled]: (state, action) => {
            state.status = 'succeded'
            state.data = action.payload
        },
        [fetchNews.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export default newsSlice.reducer