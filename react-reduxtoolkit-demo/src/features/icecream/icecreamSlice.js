import { createSlice } from "@reduxjs/toolkit";

import { ordered as cakeOrdered } from "../cake/cakeSlice";

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
		builder.addCase(cakeOrdered, (state) => {
			state.numOficecreams--;
		});
		// builder.addCase("cake/restocked", (state, action) => {
		// 	state.numOficecreams += action.payload;
		// });
	},
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
