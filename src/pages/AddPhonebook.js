import { useState } from 'react';

const AddPhonebook = () => {
	const [myData, setmyData] = useState({
		name: '',
		phoneNumber: '',
		location: '',
	});
	const handleSubmit = e => {
		e.preventDefault();
		console.log(myData);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='Enter name' value={myData.name} onChange={e => setmyData({ ...myData, name: e.target.value })} />
				<br />
				<input type='text' placeholder='Enter phoneNumber' value={myData.phoneNumber} onChange={e => setmyData({ ...myData, phoneNumber: e.target.value })} />
				<br />
				<input type='text' placeholder='Enter location' value={myData.location} onChange={e => setmyData({ ...myData, location: e.target.value })} />
				<br />
				<button type='submit'> Add Task</button>
			</form>
		</div>
	);
};

export default AddPhonebook;
