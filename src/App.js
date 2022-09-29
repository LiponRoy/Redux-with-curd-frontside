import React, { useEffect } from 'react';
import './App.css';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Deshboard from './pages/Deshboard';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import AddPhonebook from './pages/AddPhonebook';
function App() {
	return (
		<div className='App'>
			{/* <AddPhonebook></AddPhonebook> */}
			<Navbar></Navbar>
			<Routes>
				<Route path='/' element={<Deshboard />} />
				<Route path='/reg' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
			<ToastContainer></ToastContainer>
		</div>
	);
}
export default App;
