import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import styles from './City.module.css';
import Spinner from './Spinner';
import BackButton from './BackButton';

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

function City() {
	const { id } = useParams();
	const { isLoading, currentCity, getCity } = useCities();

	useEffect(() => {
		getCity(id);
	}, [id]);

	const { cityName, countryCode, date, notes } = currentCity;

	if (isLoading) return <Spinner />;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span className={`fi fi-${(countryCode || '').toLowerCase()}`}></span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a href={`https://en.wikipedia.org/wiki/${cityName}`} target='_blank' rel='noreferrer'>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>
				<BackButton>Back</BackButton>
			</div>
		</div>
	);
}

export default City;
