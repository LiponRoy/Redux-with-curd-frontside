import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerMe, reset } from '../features/auth/authSlice';
import Spinner from './Spinner';
const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

	const { register, handleSubmit } = useForm();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate('/');
			toast.success(message);
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onSubmit = data => {
		console.log(data);
		dispatch(registerMe(data));
	};

	if (isLoading) {
		return <Spinner></Spinner>;
	}
	return (
		<div>
			<div className='topContainer'>
				<h1>Sign up please</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input className='inputOption' placeholder='name' {...register('name', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='inputOption' placeholder='email' {...register('email', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='inputOption' placeholder='password' {...register('password', { required: true, maxLength: 50 })} />
					<br></br>

					<input className='inputBtn' type='submit' />
				</form>
			</div>
		</div>
	);
};

export default Register;
