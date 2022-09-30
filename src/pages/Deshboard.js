import React, { useState } from 'react';
import CreatePhoneBook from './CreatePhoneBook';
import ListView from './ListView';

const Deshboard = () => {
	const [myData, setMyData] = useState({
		name: '',
		phoneNumber: '',
		location: '',
	});
	return (
		<div className='grid grid-cols-1 md:grid-cols-2'>
			<ListView setMyData={setMyData}></ListView>
			<CreatePhoneBook myData={myData} setMyData={setMyData}></CreatePhoneBook>
		</div>
	);
};

export default Deshboard;
