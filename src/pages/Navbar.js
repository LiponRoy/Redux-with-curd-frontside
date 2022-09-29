import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutMe, reset } from '../features/auth/authSlice';
const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);

	const onLogout = () => {
		dispatch(logoutMe());
		navigate('/reg');
		dispatch(reset());
	};
	return (
		<>
			<div className=' w-full h-20 bg-red-500 px-8 text-white'>
				<div className=' w-full h-full flex justify-end items-center'>
					{!user ? (
						<span className='mx-2 text-2xl'>
							<Link to='/reg'>SignUp</Link>
						</span>
					) : (
						''
					)}
					{user ? (
						<button onClick={onLogout}>Logout</button>
					) : (
						<span className='mx-2 text-2xl'>
							<Link to='/login'>Login</Link>
						</span>
					)}
					{user && <Link to='/'>Deshboard</Link>}
				</div>
			</div>
		</>
	);
};

export default Navbar;
