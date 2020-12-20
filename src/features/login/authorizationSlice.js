import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    status: 'idle',
    error: null
}

export const signin = createAsyncThunk('authorization/signin', async (p, {rejectWithValue}) => {
    const {email, password} = p;
    let res = await fetch(
        "https://mysterious-reef-29460.herokuapp.com/api/v1/validate", 
        {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(
                {email, password}
            )
        }
    )

        
    res = await res.json();
    // return res.data.id
    console.log(res)
    return res.status === 'ok' ? res.data.id : rejectWithValue(res.message)
})

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        signout(state, action) {
            state.status = 'idle'
            state.error = null
            state.userId = null
        }
    },
    extraReducers: {
        [signin.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signin.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.userId = action.payload;
        },
        [signin.rejected]: (state, action) => {
            console.log(action)
            state.status = 'failed'
            state.error = action.payload
        }
    }
})

export const {signout} = authorizationSlice.actions

export default authorizationSlice.reducer