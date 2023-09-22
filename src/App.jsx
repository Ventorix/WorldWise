import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
		async function fetchCities() {
			try {
				setisLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch (err) {
				console.log(err);
			} finally {
				setisLoading(false);
			}
		}

		fetchCities();
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route index element={<Navigate replace to='cities' />} />
					<Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path='countries' element={<p>Countries</p>} />
					<Route path='form' element={<p>form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
