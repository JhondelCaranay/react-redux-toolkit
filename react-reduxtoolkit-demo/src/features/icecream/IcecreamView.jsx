import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ordered as icecreamOrdered,
	restocked as icecreamRestocked,
} from "./icecreamSlice";

const IcecreamView = () => {
	const [quantity, setQuantity] = useState(1);
	const { numOficecreams } = useSelector((state) => state.icecream);
	const dispatch = useDispatch();

	return (
		<div>
			<h2>Number of icecreams - {numOficecreams}</h2>
			<button onClick={() => dispatch(icecreamOrdered())}>
				Order icecreams
			</button>
			<br />
			<input
				type="number"
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			/>
			<br />
			<button onClick={() => dispatch(icecreamRestocked(quantity))}>
				Restock icecreams
			</button>
		</div>
	);
};
export default IcecreamView;
