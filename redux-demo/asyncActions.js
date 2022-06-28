const axios = require("axios");

const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
	loading: false,
	users: [],
	error: null,
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

//ACTIONS
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUESTED,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCEEDED,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	};
};

const fetchUsers = () => {
	return async (dispatch) => {
		dispatch(fetchUsersRequest());

		try {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/users"
			);
			// console.log(response.data);

			// filter to 50 users and only return their id and name
			const users = response.data.slice(0, 10).map((user) => {
				return {
					id: user.id,
					name: user.name,
				};
			});

			dispatch(fetchUsersSuccess(users));
		} catch (error) {
			dispatch(fetchUsersFailure(error.message));
		}

		// axios
		// 	.get("https://jsonplaceholder.typicode.com/users")
		// 	.then((response) => {
		// 		// response.data is the users
		// 		const users = response.data.map((user) => user.id);
		// 		dispatch(fetchUsersSuccess(users));
		// 	})
		// 	.catch((error) => {
		// 		// error.message is the error message
		// 		dispatch(fetchUsersFailure(error.message));
		// 	});
	};
};

//REDUCER
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUESTED:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCEEDED:
			return {
				...state,
				loading: false,
				users: action.payload,
			};
		case FETCH_USERS_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
	console.log("Store changed", store.getState());
});

store.dispatch(fetchUsers());
