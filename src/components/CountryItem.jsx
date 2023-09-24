import styles from './CountryItem.module.css';

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<span className={`fi fi-${country.countryCode.toLowerCase()}`}></span>
			<span>{country.countryName}</span>
		</li>
	);
}

export default CountryItem;
