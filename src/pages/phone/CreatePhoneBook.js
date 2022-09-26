import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { phoneBookCreate } from '../../features/phoneBook/phoneSlice';
const CreatePhoneBook = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { addStatus, addError } = useSelector(state => state.phone);

	const { register, handleSubmit } = useForm();

	const onSubmit = data => {
		dispatch(phoneBookCreate(data));
	};
	if (addStatus === 'fulfilled') {
		toast.success('Data inserted');
		navigate('/');
	}
	if (addStatus === 'rejected') {
		toast.error(addError);
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
