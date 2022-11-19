import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBook, getPhonebook } from '../features/phoneBook/phoneSlice';
import Spinner from './Spinner';
const ListView = ({ setMyData }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { createStatus, createError, dataArray } = useSelector((state) => state.phone);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (user) {
			dispatch(getPhonebook());
		}
	}, [user, dispatch, dataArray]);

	if (createStatus === 'pending') {
		return <Spinner></Spinner>;
	}
	if (createStatus === 'rejected') {
		toast.error(createError);
	}

	// for updating phonebook

	const updatePhoneBookClick = (data) => {
		setMyData(data);
	};

	// for deleting phonebook
	const deletePhoneBook = (_id) => {
		dispatch(deleteBook(_id));
	};
	return (
		<div className=' h-[90vh] flex flex-col justify-center items-center '>
			<span className=' text-2xl m-2'>{user && user.user.name}</span>
			<span className=' text-2xl m-2'>{dataArray && dataArray.length} -Phonebook</span>

			{dataArray &&
				dataArray.map((data, index) => (
					<div key={index} className='flex  bg-zinc-200 p-2 mb-2 '>
						<span className=' text-2xl m-2'>{data.name}</span>
						<span className=' text-2xl m-2'>{data.phoneNumber}</span>
						<button onClick={() => deletePhoneBook(data._id)} className='btn btn-xs m-2'>
							REMOVE
						</button>
						<br></br>
						<button onClick={() => updatePhoneBookClick(data)} className='btn btn-xs m-2'>
							Update
						</button>
						<br></br>
					</div>
				))}
		</div>
	);
};

export default ListView;
