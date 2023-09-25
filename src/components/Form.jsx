// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useUrlPosition } from '../hooks/useUrlPosition';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [countryCode, setCountryCode] = useState('');
	const [geocodingError, setGeocodingError] = useState('');
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [lat, lng] = useUrlPosition();

	useEffect(
		function () {
			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeocodingError('');

					const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
					const data = await res.json();

					if (!data.countryCode)
						throw new Error("That doesn't seem to be city. Click in another place");

					setCityName(data.city || data.locality || '');
					setCountry(data.countryName);
					setCountryCode(data.countryCode);
				} catch (err) {
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng],
	);

	if (isLoadingGeocoding) return <Spinner />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>Place name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={`${cityName}, ${country}`}
				/>
				<span className={`${styles.flag} fi fi-${(countryCode || '').toLowerCase()}`}></span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<input id='date' onChange={(e) => setDate(e.target.value)} value={date} />
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type={'primary'}>Add</Button>
				<BackButton>Back</BackButton>
			</div>
		</form>
	);
}

export default Form;
