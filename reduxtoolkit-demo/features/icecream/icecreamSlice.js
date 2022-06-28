const createSlice = require("@reduxjs/toolkit").createSlice;
const { cakeActions } = require("../cake/cakeSlice");

const initialState = {
	numOficecreams: 20,
};

const icecreamSlice = createSlice({
	name: "icecream",
	initialState,
	reducers: {
		ordered: (state) => {
			state.numOficecreams--;
		},
		restocked: (state, action) => {
			state.numOficecreams += action.payload;
		},
	},
	// extraReducers: {
	// 	// when action cake/ordered is dispatched extraReducers will be called
	// 	["cake/ordered"]: (state) => {
	// 		state.numOficecreams--;
	// 	},
	// },

	//RECOMMENDED WAY TO ADD EXTRA REDUCERS
	extraReducers: (builder) => {
		builder.addCase(cakeActions.ordered, (state) => {
			state.numOficecreams--;
		});
		// builder.addCase("cake/restocked", (state, action) => {
		// 	state.numOficecreams += action.payload;
		// });
	},
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
