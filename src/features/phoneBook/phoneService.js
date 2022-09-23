import axios from 'axios';

const PHONEBOOK_CREATE_API_URL = '/phone/create';
// const Login_API_URL = '/user/login';
// const Logout_API_URL = '/user/logout';

// for register
const createPhoneBook = async userData => {
	const response = await axios.post(PHONEBOOK_CREATE_API_URL, userData);
	return response.data;
};
// //for login
// const login = async userData => {
// 	const response = await axios.post(Login_API_URL, userData);
// 	return response.data;
// };

// // for logout
// const logout = async () => {
// 	const response = await axios.post(Logout_API_URL);
// 	return response.data;
// };

const phoneService = {
	createPhoneBook,
	// logout,
	// login,
};
export default phoneService;
