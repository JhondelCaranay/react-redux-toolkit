import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

const UserView = () => {
	const { users, loading, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	return (
		<div>
			<h2>List of users</h2>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{users && (
				<ul>
					{users.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default UserView;
