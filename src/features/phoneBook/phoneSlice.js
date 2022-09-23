import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import phoneService from './phoneService';

// InitialState
const initialState = {
	// user: null,
	isError: false,
	isLoading: false,
	message: '',
};

// register user
export const phoneBookCreate = createAsyncThunk('phone/create', async (user, thunkAPI) => {
	try {
		return await phoneService.createPhoneBook(user);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const phoneSlice = createSlice({
	name: 'phone',
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
			.addCase(phoneBookCreate.pending, state => {
				state.isLoading = true;
			})

			.addCase(phoneBookCreate.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.message = action.payload;
				// state.user = action.payload;
			})
			.addCase(phoneBookCreate.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				// state.user = null;
			});
	},
});

export const { reset } = phoneSlice.actions;
export default phoneSlice.reducer;
