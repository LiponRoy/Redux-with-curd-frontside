import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
const BASE_URL = 'http://localhost:5000/';

// InitialState
const initialState = {
	user: null,
	signUpStatus: '',
	signUpError: '',
	loginStatus: '',
	loginError: '',
	logOutStatus: '',
	logOutError: '',
	message: '',
};
// user: null,
// isError: false,
// isLoading: false,
// message: '',

// register user
export const registerMe = createAsyncThunk('auth/registerMe', async (user, thunkAPI) => {
	try {
		const response = await axios.post(BASE_URL + 'user/reg', user);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Login user
export const loginMe = createAsyncThunk('auth/loginMe', async (user, thunkAPI) => {
	try {
		const response = await axios.post(BASE_URL + 'user/login', user);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Logout user
export const logoutMe = createAsyncThunk('auth/logoutMe', async (thunkAPI) => {
	try {
		const response = await axios.post(BASE_URL + 'user/logout');
		// return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// reset: state => {
		// 	state.isLoading = false;
		// 	state.isSuccess = false;
		// 	state.isError = false;
		// 	state.message = '';
		// },
	},
	extraReducers: {
		[registerMe.pending]: (state, action) => {
			return {
				...state,
				signUpStatus: 'pending',
				signUpError: '',
				loginStatus: '',
				loginError: '',
				logOutStatus: '',
				logOutError: '',
			};
		},
		[registerMe.fulfilled]: (state, action) => {
			return {
				...state,
				user: action.payload,
				signUpStatus: 'fulfilled',
				signUpError: '',
				loginStatus: '',
				loginError: '',
				logOutStatus: '',
				logOutError: '',
			};
		},
		[registerMe.rejected]: (state, action) => {
			return {
				...state,
				user: null,
				signUpStatus: 'rejected',
				signUpError: action.payload,
				loginStatus: '',
				loginError: '',
				logOutStatus: '',
				logOutError: '',
			};
		},
		// for login task
		[loginMe.pending]: (state, action) => {
			return {
				...state,
				user: null,
				signUpStatus: '',
				signUpError: '',
				loginStatus: 'pending',
				loginError: '',
				logOutStatus: '',
				logOutError: '',
			};
		},
		[loginMe.fulfilled]: (state, action) => {
			return {
				...state,
				user: action.payload,
				signUpStatus: '',
				signUpError: '',
				loginStatus: 'fulfilled',
				loginError: '',
				logOutStatus: '',
				logOutError: '',
			};
		},
		[loginMe.rejected]: (state, action) => {
			return {
				...state,
				user: null,
				signUpStatus: '',
				signUpError: '',
				loginStatus: 'rejected',
				loginError: action.payload,
				logOutStatus: '',
				logOutError: '',
			};
		},
		// logOut task
		[logoutMe.pending]: (state, action) => {
			return {
				...state,
				user: null,
				signUpStatus: '',
				signUpError: '',
				loginStatus: '',
				loginError: '',
				logOutStatus: 'pending',
				logOutError: '',
			};
		},
		[logoutMe.fulfilled]: (state, action) => {
			return {
				...state,
				user: null,
				signUpStatus: '',
				signUpError: '',
				loginStatus: '',
				loginError: '',
				logOutStatus: 'fulfilled',
				logOutError: '',
			};
		},
		[logoutMe.rejected]: (state, action) => {
			return {
				...state,
				user: null,
				signUpStatus: '',
				signUpError: '',
				loginStatus: '',
				loginError: '',
				logOutStatus: 'rejected',
				logOutError: action.payload,
			};
		},
	},
});

//export const { reset } = authSlice.actions;
export default authSlice.reducer;
