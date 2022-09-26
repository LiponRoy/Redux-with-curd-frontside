import axios from 'axios';

// const Reg_API_URL = '/user/reg';
// const Login_API_URL = '/user/login';
// const Logout_API_URL = '/user/logout';

//base url
const BASE_URL = 'http://localhost:5000/';

// for register
const register = async userData => {
	const response = await axios.post(BASE_URL + 'user/reg', userData);
	return response.data;
};
//for login
const login = async userData => {
	const response = await axios.post(BASE_URL + 'user/login', userData);
	return response.data;
};

// for logout
const logout = async () => {
	const response = await axios.post(BASE_URL + 'user/logout');
	return response.data;
};

const authService = {
	register,
	logout,
	login,
};
export default authService;
