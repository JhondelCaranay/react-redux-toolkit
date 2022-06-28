const redux = require("redux");

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// CONSTANTS
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//ACTION is a function that return an object with type and payload
function orderCake() {
	return {
		type: CAKE_ORDERED,
		payload: 1,
	};
}

function restockCake(qty = 1) {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	};
}

function orderIcecream(qty = 1) {
	return {
		type: ICECREAM_ORDERED,
		payload: qty,
	};
}

function restockIcecream(qty = 1) {
	return {
		type: ICECREAM_RESTOCKED,
		payload: qty,
	};
}

//REDUCER is a function that takes in the previous state and an action and returns a new state
// const initialState = {
// 	numOfCakes: 10,
// 	numOfIcecreams: 20,
// };

const initialCakeState = {
	numOfCakes: 10,
};
const initialIcecreamState = {
	numOfIcecreams: 20,
};
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state, //spread the old state
				numOfCakes: state.numOfCakes - 1,
			};
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCakes: state.numOfCakes + action.payload,
			};
		default:
			return state;
	}
};

const iceCreamreducer = (state = initialIcecreamState, action) => {
	switch (action.type) {
		case ICECREAM_ORDERED:
			return {
				...state,
				numOfIcecreams: state.numOfIcecreams - 1,
			};
		case ICECREAM_RESTOCKED:
			return {
				...state,
				numOfIcecreams: state.numOfIcecreams + action.payload,
			};

		default:
			return state;
	}
};

// const store = createStore(reducer); // create store accepts a reducer

//combine multiploe reducer into single reducer
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamreducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial State: ", store.getState()); // gives the initial state

// const unsubscribe = store.subscribe(() => {
// 	console.log("Store Changed: ", store.getState()); // prints the new state , the updated state
// });

const unsubscribe = store.subscribe(() => {}); // logs handle by middleware logger

// store.dispatch(orderCake()); // dispatches the action
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// // RE-STOCK CAKE
// store.dispatch(restockCake(5));
// store.dispatch(restockCake(3));
// store.dispatch(restockCake(2));

const actions = bindActionCreators(
	{ orderCake, restockCake, orderIcecream, restockIcecream },
	store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(5);
actions.restockCake(3);
actions.restockCake(2);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(5);

unsubscribe(); // unsubscribe the store
