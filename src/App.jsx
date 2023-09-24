import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import CountriesList from './components/CountriesList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';

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
					<Route
						path='cities'
						element={
							<CitiesProvider>
								<CityList />
							</CitiesProvider>
						}
					/>
					<Route path='cities/:id' element={<City />} />
					<Route
						path='countries'
						element={
							<CitiesProvider>
								<CountriesList />
							</CitiesProvider>
						}
					/>
					<Route path='form' element={<Form />} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
