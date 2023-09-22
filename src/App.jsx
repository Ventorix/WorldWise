import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route index element={<Navigate replace to='cities' />} />
					<Route path='cities' element={<p>Cities</p>} />
					<Route path='countries' element={<p>Countries</p>} />
					<Route path='form' element={<p>form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
