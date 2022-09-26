import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPhonebook } from '../features/phoneBook/phoneSlice';
import Spinner from './Spinner';
const Deshboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { dataArray, addStatus, addError } = useSelector(state => state.phone);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (user) {
			dispatch(getPhonebook());
		}
	}, [user, dispatch]);

	if (addStatus === 'pending') {
		return <Spinner></Spinner>;
	}
	if (addError) {
		toast.error(addError);
	}
	return (
		<div>
			<span className=' text-2xl m-2'>{user && user.user.name}</span>
			<span className=' text-2xl m-2'>get all Phonebook</span>

			{dataArray &&
				dataArray.map((data, index) => (
					<div className='flex flex-col bg-zinc-200 p-6 m-10'>
						<span key={index}>{data.name}</span>
						<span key={index}> -- {data.phoneNumber}</span>
						<button class='btn btn-active btn-secondary'>REMOVE</button>
						<br></br>
						<button class='btn btn-active btn-secondary'>Update</button>
						<br></br>
					</div>
				))}
		</div>
	);
};

export default Deshboard;
