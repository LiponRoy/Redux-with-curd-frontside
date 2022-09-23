import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { phoneBookCreate, reset } from '../../features/phoneBook/phoneSlice';
import Spinner from '../Spinner';
const CreatePhoneBook = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, isError, isSuccess, message } = useSelector(state => state.phone);

	const { register, handleSubmit } = useForm();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess) {
			// navigate('/');
			toast.success('Data Inserted ! Yeahoo');
		}

		dispatch(reset());
	}, [isError, isSuccess, message, navigate, dispatch]);

	const onSubmit = data => {
		console.log(data);
		dispatch(phoneBookCreate(data));
	};

	if (isLoading) {
		return <Spinner></Spinner>;
	}
	return (
		<div>
			<div className=' h-[90vh] flex flex-col justify-center items-center'>
				<span className=' text-2xl m-2'>Create Phonebook</span>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='name' {...register('name', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='phoneNumber' {...register('phoneNumber', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='location' {...register('location', { required: true, maxLength: 50 })} />
					<br></br>

					<input className='w-[30rem] h-12 mt-1 pl-2 rounded-lg text-white bg-cyan-600 cursor-pointer' type='submit' />
				</form>
			</div>
		</div>
	);
};

export default CreatePhoneBook;
