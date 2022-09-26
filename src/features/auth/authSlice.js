import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// InitialState
const initialState = {
	user: null,
	isError: false,
	isLoading: false,
	message: '',
};

// register user
export const registerMe = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Login user
export const loginMe = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Logout user
export const logoutMe = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerMe.pending, state => {
				state.isLoading = true;
			})

			.addCase(registerMe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload;
				state.user = action.payload;
			})
			.addCase(registerMe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(loginMe.pending, state => {
				state.isLoading = true;
			})

			.addCase(loginMe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload.messageUs;
				state.user = action.payload;
			})
			.addCase(loginMe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})

			.addCase(logoutMe.fulfilled, state => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
