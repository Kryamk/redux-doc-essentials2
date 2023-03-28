import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await client.get('/fakeApi/users')
	return response.data
})


const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
	}
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(state => state.users)






// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { client } from "../../api/client"

// // const initialState = [
// // 	{ id: '0', name: 'Tianna Jenkins' },
// // 	{ id: '1', name: 'Kevin Grant' },
// // 	{ id: '2', name: 'Madison Price' }
// // ]
// const initialState = []


// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
// 	const response = await client.get('/fakeApi/users')
// 	return response.data
// })


// const usersSlice = createSlice({
// 	name: 'users',
// 	initialState,
// 	reducers: {},
// 	extraReducers(builder) {
// 		builder.addCase(fetchUsers.fulfilled, (state, action) => {
// 			return action.payload
// 		})
// 	}
// })

// export default usersSlice.reducer

// export const selectAllUsers = state => state.users
// export const selectUserById = (state, userId) => state.users.find(user => user.id === userId)
