// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getPhonebook, reset } from '../../features/phoneBook/phoneSlice';
// import Spinner from '../Spinner';
// const GetPhonebooks = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	const { user } = useSelector(state => state.auth);
// 	const { myPhone, isLoading, isError, message } = useSelector(state => state.phone);

// 	// const { register, handleSubmit } = useForm();

// 	useEffect(() => {
// 		if (isError) {
// 			toast.error(message);
// 		}
// 		if (!user) {
// 			navigate('/login');
// 		}

// 		dispatch(getPhonebook());

// 		return () => {
// 			dispatch(reset());
// 		};
// 	}, [user, isError, message, navigate, dispatch]);

// 	if (isLoading) {
// 		return <Spinner></Spinner>;
// 	}
// 	return (
// 		<div>
// 			<span className=' text-2xl m-2'>get all Phonebook</span>
// 		</div>
// 	);
// };

// export default GetPhonebooks;
import React from 'react';

const GetPhonebooks = () => {
	return <div>GetPhonebooks</div>;
};

export default GetPhonebooks;
