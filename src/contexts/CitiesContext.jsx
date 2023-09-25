import { useEffect, useState, createContext, useContext } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [currentCity, setCurrentCity] = useState({});
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

	async function getCity(id) {
		try {
			setisLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			console.log(data);
			setCurrentCity(data);
		} catch (err) {
			console.log(err);
		} finally {
			setisLoading(false);
		}
	}

	async function createCity(newCity) {
		try {
			setisLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			console.log(data);

			setCities((cities) => [...cities, data]);
		} catch (err) {
			console.log(err);
		} finally {
			setisLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, setisLoading, currentCity, setCurrentCity, getCity, createCity }}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	if (context === undefined) {
		throw new Error('CitiesContext was used outside of the CitiesProvider');
	}

	return context;
}

export { CitiesProvider, useCities };
