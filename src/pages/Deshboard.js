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
		<div className=' container grid grid-cols-1 md:grid-cols-2'>
			<CreatePhoneBook myData={myData} setMyData={setMyData}></CreatePhoneBook>
			<ListView myData={myData}></ListView>
		</div>
	);
};

export default Deshboard;
