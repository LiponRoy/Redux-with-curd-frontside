import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { phoneBookCreate, updatePhoneBook, reset } from '../features/phoneBook/phoneSlice';

const CreatePhoneBook = ({ myData, setMyData }) => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const { createStatus, createError } = useSelector((state) => state.phone);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (myData._id) {
			// if id already exits then update. because id has only exiting item.
			dispatch(updatePhoneBook(myData));
		} else {
			// if id do not already exits then create. because new item do not hav any id.
			dispatch(phoneBookCreate(myData));
		}

		// for reset input velu
		setMyData({ name: '', phoneNumber: '', location: '' });

		// console.log(myData);
	};
	if (createStatus === 'fulfilled') {
		toast.success('Data inserted new one');

		// navigate('/');
	}
	if (createStatus === 'rejected') {
		toast.error(createError);
	}
	return (
		<div>
			<div className=' h-[90vh] flex flex-col justify-center items-center'>
				<span className=' text-2xl m-2'>Create Phonebook</span>

				<form onSubmit={handleSubmit} className='fromInput'>
					<input type='text' placeholder='Enter name' value={myData.name} onChange={(e) => setMyData({ ...myData, name: e.target.value })} />
					<br />
					<input type='text' placeholder='Enter phoneNumber' value={myData.phoneNumber} onChange={(e) => setMyData({ ...myData, phoneNumber: e.target.value })} />
					<br />
					<input type='text' placeholder='Enter location' value={myData.location} onChange={(e) => setMyData({ ...myData, location: e.target.value })} />
					<br />
					<button type='submit'>{myData._id ? 'Update data' : 'Add data'}</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePhoneBook;
