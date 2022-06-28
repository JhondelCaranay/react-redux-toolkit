import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ordered as cakeOrdered,
	restocked as cakeRestocked,
} from "./cakeSlice";

const CakeView = () => {
	const [quantity, setQuantity] = useState(1);
	const { numOfCakes } = useSelector((state) => state.cake);
	const dispatch = useDispatch();
	return (
		<div>
			<h2>Number of cakes - {numOfCakes}</h2>
			<button onClick={() => dispatch(cakeOrdered())}>Order cake</button>
			<br />
			<input
				type="number"
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>
			<br />
			<button
				onClick={() => {
					dispatch(cakeRestocked(quantity));
				}}
			>
				Restock cake
			</button>
		</div>
	);
};
export default CakeView;

// const quantity = useRef(1);-

// onClick={() => {
//     //convert to int
//     dispatch(cakeRestocked(parseInt(quantity.current.value)));
//     quantity.current.value = 1;
// }}
