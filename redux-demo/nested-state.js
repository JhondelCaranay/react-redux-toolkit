const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
	name: "jhon",
	address: {
		street: "123 Sub St",
		city: "Malolos",
		state: "Bulacan",
	},
};

const STREET_UPDATED = "STREET_UPDATED";

// ACTION
const updateStreet = (street) => {
	return {
		type: STREET_UPDATED,
		payload: street,
	};
};

//REDUCER
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case STREET_UPDATED:
			// return {
			// 	...state,
			// 	address: {
			// 		...state.address,
			// 		street: action.payload,
			// 	},
			// };
			return produce(state, (draft) => {
				draft.address.street = action.payload;
			}); 
		default:
			return state;
	}
};

const store = redux.createStore(reducer);
console.log("Initial State ", store.getState());

const unsubscribe = store.subscribe(() => {
	console.log("Updated State ", store.getState());
});

store.dispatch(updateStreet("456 Main St"));
unsubscribe();
