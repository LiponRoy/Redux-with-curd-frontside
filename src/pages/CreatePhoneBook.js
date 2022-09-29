import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { phoneBookCreate } from '../features/phoneBook/phoneSlice';

const CreatePhoneBook = ({ myData, setMyData }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { addStatus, addError } = useSelector(state => state.phone);

	// const { register, handleSubmit } = useForm();

	// const onSubmit = data => {
	// 	dispatch(phoneBookCreate(data));
	// };
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(phoneBookCreate(myData));
		console.log(myData);
	};
	if (addStatus === 'fulfilled') {
		toast.success('Data inserted');
		// navigate('/');
	}
	if (addStatus === 'rejected') {
		toast.error(addError);
	}
	return (
		<div>
			<div className=' h-[90vh] flex flex-col justify-center items-center bg-green-300'>
				<span className=' text-2xl m-2'>Create Phonebook</span>
				{/* <form onSubmit={handleSubmit(onSubmit)}>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='name' {...register('name', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='phoneNumber' {...register('phoneNumber', { required: true, maxLength: 50 })} />
					<br></br>
					<input className='w-[30rem] h-12 bg-slate-100 my-1 pl-2 rounded-lg border-2 border-cyan-500' placeholder='location' {...register('location', { required: true, maxLength: 50 })} />
					<br></br>

					<input className='w-[30rem] h-12 mt-1 pl-2 rounded-lg text-white bg-cyan-600 cursor-pointer' type='submit' />
				</form> */}
				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='Enter name' value={myData.name} onChange={e => setMyData({ ...myData, name: e.target.value })} />
					<br />
					<input type='text' placeholder='Enter phoneNumber' value={myData.phoneNumber} onChange={e => setMyData({ ...myData, phoneNumber: e.target.value })} />
					<br />
					<input type='text' placeholder='Enter location' value={myData.location} onChange={e => setMyData({ ...myData, location: e.target.value })} />
					<br />
					<button type='submit'> Add Task</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePhoneBook;
