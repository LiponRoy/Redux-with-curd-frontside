import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Deshboard from './pages/Deshboard';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Deshboard />} />
				<Route path='reg' element={<Register />} />
			</Routes>
			<ToastContainer></ToastContainer>
		</div>
	);
}
export default App;
