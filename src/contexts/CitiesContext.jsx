import { useEffect, createContext, useContext, useReducer } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};
function reducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case 'loading': {
			return { ...state, isLoading: true };
		}
		case 'cities/loaded': {
			return { ...state, isLoading: false, cities: payload };
		}
		case 'city/loaded': {
			return { ...state, isLoading: false, currentCity: payload };
		}
		case 'city/created': {
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, payload],
				currentCity: payload,
			};
		}
		case 'city/deleted': {
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== payload),
				currentCity: {},
			};
		}
		case 'rejected': {
			return { ...state, isLoading: false, error: payload };
		}
		default:
			return state;
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: 'loading' });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch (err) {
				dispatch({ type: 'rejected', payload: err });
			}
		}

		fetchCities();
	}, []);

	async function getCity(id) {
		if (Number(id) === currentCity.id) return;

		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: 'city/loaded', payload: data });
		} catch (err) {
			dispatch({ type: 'rejected', payload: err });
		}
	}

	async function createCity(newCity) {
		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();

			dispatch({ type: 'city/created', payload: data });
		} catch (err) {
			console.log(err);
		}
	}

	async function removeCity(id) {
		dispatch({ type: 'loading' });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});

			dispatch({ type: 'city/deleted', payload: id });
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				removeCity,
				error,
			}}>
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
