import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Deshboard = () => {
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [navigate, user]);
	return (
		<div>
			<h1>Deshboard Here</h1>
			<h1>Name: {user && user.user.name}</h1>
			<h1>Email: {user && user.user.email}</h1>
		</div>
	);
};

export default Deshboard;
