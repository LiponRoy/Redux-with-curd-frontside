import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//base url
const BASE_URL = 'http://localhost:5000/';
// InitialState
const initialState = {
	dataArray: [],
	createStatus: '',
	createError: '',
	getStatus: '',
	getError: '',
	updateStatus: '',
	updateError: '',
	deleteStatus: '',
	deleteError: '',
	// isError: false,
	// isSuccess: false,
	// isLoading: false,
};

// create phonebook
export const phoneBookCreate = createAsyncThunk('phone/phoneBookCreate', async (phoneBook, thunkAPI) => {
	try {
		const response = await axios.post(BASE_URL + 'phone/create', phoneBook);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// get all phonebook
export const getPhonebook = createAsyncThunk('phone/getPhonebook', async (_, thunkAPI) => {
	try {
		const response = await axios.get(BASE_URL + 'phone/');
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});
// update phonebook
export const updatePhoneBook = createAsyncThunk('phone/updatePhoneBook', async (phoneBook, thunkAPI) => {
	try {
		const { _id, name, phoneNumber, location } = phoneBook;
		const response = await axios.put(BASE_URL + 'phone/update/' + _id, {
			name,
			phoneNumber,
			location,
		});
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Delete phonebook
export const deleteBook = createAsyncThunk('phone/deleteBook', async (_id, thunkAPI) => {
	try {
		const response = await axios.delete(BASE_URL + 'phone/delete/' + _id);
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

const phoneSlice = createSlice({
	name: 'phone',
	initialState,
	reducers: {},
	extraReducers: (bulder) => {
		bulder
			.addCase(phoneBookCreate.pending, (state, action) => {
				state.createStatus = 'pending';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(phoneBookCreate.fulfilled, (state, action) => {
				state.dataArray.push(action.payload);
				state.createStatus = 'fulfilled';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(phoneBookCreate.rejected, (state, action) => {
				state.createStatus = 'rejected';
				state.createError = action.payload;
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(getPhonebook.pending, (state, action) => {
				state.createStatus = '';
				state.createError = '';
				state.getStatus = 'pending';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(getPhonebook.fulfilled, (state, action) => {
				state.dataArray = action.payload;
				state.createStatus = '';
				state.createError = '';
				state.getStatus = 'fulfilled';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(getPhonebook.rejected, (state, action) => {
				state.createStatus = '';
				state.createError = '';
				state.getStatus = 'rejected';
				state.getError = action.payload;
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			// for updating task
			.addCase(updatePhoneBook.pending, (state, action) => {
				state.createStatus = '';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = 'pending';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(updatePhoneBook.fulfilled, (state, action) => {
				const updateData = state.dataArray.map((dArray) => (dArray._id === action.payload._id ? action.payload : dArray));
				state.dataArray = updateData;
				state.createStatus = '';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = 'fulfilled';
				state.updateError = '';
				state.deleteStatus = '';
				state.deleteError = '';
			})
			.addCase(updatePhoneBook.rejected, (state, action) => {
				state.createStatus = '';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = 'rejected';
				state.updateError = action.payload;
				state.deleteStatus = '';
				state.deleteError = '';
			})
			// for delete task
			.addCase(deleteBook.pending, (state, action) => {
				state.createStatus = '';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = 'pending';
				state.deleteError = '';
			})
			.addCase(deleteBook.fulfilled, (state, action) => {
				const deletePhone = state.dataArray.filter((dataMe) => {
					return dataMe._id !== action.payload._id;
				});
				state.dataArray = deletePhone;
				state.createStatus = '';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = 'fulfilled';
				state.deleteError = '';
			})
			.addCase(deleteBook.rejected, (state, action) => {
				state.createStatus = '';
				state.createError = '';
				state.getStatus = '';
				state.getError = '';
				state.updateStatus = '';
				state.updateError = '';
				state.deleteStatus = 'rejected';
				state.deleteError = action.payload;
			});
	},
	// extraReducers: {
	// 	[phoneBookCreate.pending]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: 'pending',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[phoneBookCreate.fulfilled]: (state, action) => {
	// 		//const pushData = state.dataArray.push(action.payload);
	// 		return {
	// 			...state,
	// 			dataArray: [action.payload, ...state.dataArray],
	// 			// dataArray: state.dataArray.push(action.payload),
	// 			addStatus: 'fulfilled',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[phoneBookCreate.rejected]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: 'rejected',
	// 			addError: action.payload,
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[getPhonebook.pending]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: 'pending',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[getPhonebook.fulfilled]: (state, action) => {
	// 		return {
	// 			...state,
	// 			dataArray: action.payload,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: 'fulfilled',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[getPhonebook.rejected]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: 'rejected',
	// 			getError: action.payload,
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[updatePhoneBook.pending]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: 'pending',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[updatePhoneBook.fulfilled]: (state, action) => {
	// 		const updateData = state.dataArray.map(dArray => (dArray._id === action.payload._id ? action.payload : dArray));
	// 		return {
	// 			...state,
	// 			dataArray: updateData,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: 'fulfilled',
	// 			updateError: '',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[updatePhoneBook.rejected]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: 'rejected',
	// 			updateError: 'action.payload',
	// 			deleteStatus: '',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[deleteBook.pending]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: 'pending',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[deleteBook.fulfilled]: (state, action) => {
	// 		const deletePhone = state.dataArray.filter(dataMe => {
	// 			return dataMe._id !== action.payload._id;
	// 		});
	// 		return {
	// 			...state,
	// 			dataArray: deletePhone,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: 'fulfilled',
	// 			deleteError: '',
	// 		};
	// 	},
	// 	[deleteBook.rejected]: (state, action) => {
	// 		return {
	// 			...state,
	// 			addStatus: '',
	// 			addError: '',
	// 			getStatus: '',
	// 			getError: '',
	// 			updateStatus: '',
	// 			updateError: '',
	// 			deleteStatus: 'rejected',
	// 			deleteError: action.payload,
	// 		};
	// 	},
	// },
});

// export const { reset } = phoneSlice.actions;
export default phoneSlice.reducer;
