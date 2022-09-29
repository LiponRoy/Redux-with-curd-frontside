import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//base url
const BASE_URL = 'http://localhost:5000/';
// InitialState
const initialState = {
	dataArray: [],
	addStatus: '',
	addError: '',
	getStatus: '',
	getError: '',
	updateStatus: '',
	updateError: '',
	deleteStatus: '',
	deleteError: '',
};

// create phonebook
export const phoneBookCreate = createAsyncThunk('phone/create', async (phoneBook, thunkAPI) => {
	try {
		const response = await axios.post(BASE_URL + 'phone/create', phoneBook);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// get all phonebook
export const getPhonebook = createAsyncThunk('phone/', async (_, thunkAPI) => {
	try {
		const response = await axios.get(BASE_URL + 'phone/');
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// Delete phonebook
export const deleteBook = createAsyncThunk('phone/delete', async (_id, thunkAPI) => {
	try {
		const response = await axios.delete(BASE_URL + 'phone/delete/' + _id);
		return response.data;
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
			state.dataArray = [];
			state.addStatus = '';
			state.addError = '';
			state.getStatus = '';
			state.getError = '';
			state.updateStatus = '';
			state.updateError = '';
			state.deleteStatus = '';
			state.deleteError = '';
		},
	},
	extraReducers: {
		[phoneBookCreate.pending]: (state, action) => {
			return {
				...state,
				addStatus: 'pending',
				addError: '',
				getStatus: '',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: '',
				deleteError: '',
			};
		},
		[phoneBookCreate.fulfilled]: (state, action) => {
			return {
				...state,
				dataArray: [action.payload, ...state.dataArray],
				addStatus: 'fulfilled',
				addError: '',
				getStatus: '',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: '',
				deleteError: '',
			};
		},
		[phoneBookCreate.rejected]: (state, action) => {
			return {
				...state,
				addStatus: 'rejected',
				addError: action.payload,
				getStatus: '',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: '',
				deleteError: '',
			};
		},
		[getPhonebook.pending]: (state, action) => {
			return {
				...state,
				addStatus: '',
				addError: '',
				getStatus: 'pending',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: '',
				deleteError: '',
			};
		},
		[getPhonebook.fulfilled]: (state, action) => {
			return {
				...state,
				dataArray: action.payload,
				addStatus: '',
				addError: '',
				getStatus: 'fulfilled',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: '',
				deleteError: '',
			};
		},
		[getPhonebook.rejected]: (state, action) => {
			return {
				...state,
				addStatus: '',
				addError: '',
				getStatus: 'rejected',
				getError: action.payload,
				updateStatus: '',
				updateError: '',
				deleteStatus: '',
				deleteError: '',
			};
		},
		[deleteBook.pending]: (state, action) => {
			return {
				...state,
				addStatus: '',
				addError: '',
				getStatus: '',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: 'pending',
				deleteError: '',
			};
		},
		[deleteBook.fulfilled]: (state, action) => {
			const deletePhone = state.dataArray.filter(dataMe => {
				return dataMe._id !== action.payload._id;
			});
			return {
				...state,
				dataArray: deletePhone,
				addStatus: '',
				addError: '',
				getStatus: '',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: 'fulfilled',
				deleteError: '',
			};
		},
		[deleteBook.rejected]: (state, action) => {
			return {
				...state,
				addStatus: '',
				addError: '',
				getStatus: '',
				getError: '',
				updateStatus: '',
				updateError: '',
				deleteStatus: 'rejected',
				deleteError: action.payload,
			};
		},
	},
});

export const { reset } = phoneSlice.actions;
export default phoneSlice.reducer;
