import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import phoneReducer from '../features/phoneBook/phoneSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		phone: phoneReducer,
	},
});

// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
// 	key: 'root',
// 	version: 1,
// 	storage,
// };

// const rootReducers = combineReducers({ auth: authReducer, phone: phoneReducer });

// const persistedReducer = persistReducer(persistConfig, rootReducers);

// export const store = configureStore({
// 	reducer: persistedReducer,
// 	middleware: getDefaultMiddleware =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 			},
// 		}),
// });

// export const persistor = persistStore(store);
