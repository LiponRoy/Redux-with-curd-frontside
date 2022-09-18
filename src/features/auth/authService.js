import axios from 'axios';

const Reg_API_URL = '/user/reg';
const Login_API_URL = '/user/login';
const Logout_API_URL = '/user/logout';

// for register
const register = async userData => {
	const response = await axios.post(Reg_API_URL, userData);
	return response.data;
};
//for login
const login = async userData => {
	const response = await axios.post(Login_API_URL, userData);
	return response.data;
};

// for logout
const logout = async () => {
	const response = await axios.post(Logout_API_URL);
	return response.data;
};

const authService = {
	register,
	logout,
	login,
};
export default authService;
