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

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, setisLoading, currentCity, setCurrentCity, getCity }}>
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
