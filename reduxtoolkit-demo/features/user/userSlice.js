const createSlice = require("@reduxjs/toolkit").createSlice;
const axios = require("axios");
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
	loading: false,
	users: [],
	error: null,
};

// GENERATE PENDING ,FULFILLED,AND REJECTED ACTION TYPES
const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await axios.get(
		"https://jsonplaceholder.typicode.com/userss"
	);
	// filter to 50 users and only return their id and name
	const users = response.data.slice(0, 10).map((user) => {
		return {
			id: user.id,
			name: user.name,
		};
	});

	return users;
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				// state.error = "An error occurred while fetching users";
				// console.log(action.error);
				// state.error = action.payload;
			});
	},
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
