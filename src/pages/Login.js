import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginMe } from '../features/auth/authSlice';
import Spinner from './Spinner';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
	const { user, loginStatus, loginError } = useSelector((state) => state.auth);

	const { register, handleSubmit } = useForm();

	useEffect(() => {
		if (loginStatus === 'rejected') {
			toast.error(loginError);
		}
		if (loginStatus === 'fulfilled' || user) {
			navigate('/');
			// toast.success('login successful');
		}

		//dispatch(reset());
	}, [user, loginStatus, loginError, navigate, dispatch]);

	const onSubmit = (data) => {
		console.log(data);
		dispatch(loginMe(data));
	};

	if (loginStatus === 'pending') {
		return <Spinner></Spinner>;
	}

	return (
		<div>
			<div className=' h-[90vh] flex flex-col justify-center items-center'>
				<span className=' text-2xl m-2'>--Login--</span>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='email' {...register('email', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='password' {...register('password', { required: true, maxLength: 50 })} />
					<br></br>

					<input className='w-[30rem] h-12 mt-1 pl-2 rounded-lg text-white bg-cyan-600 cursor-pointer' type='submit' />
				</form>
			</div>
		</div>
	);
};

export default Login;
