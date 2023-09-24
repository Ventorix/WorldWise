import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CountriesList() {
	const { isLoading, cities } = useCities();

	if (isLoading) return <Spinner />;

	if (!cities.length)
		return <Message message='Add your first city by clicking on a city on the map' />;

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.countryName).includes(city.countryName)) {
			return [...arr, { countryName: city.countryName, countryCode: city.countryCode }];
		} else {
			return arr;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country, index) => (
				<CountryItem country={country} key={index} />
			))}
		</ul>
	);
}

export default CountriesList;
