import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import styles from './Map.module.css';

function Map() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const { cities } = useCities();

	const navigate = useNavigate();
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	return (
		<div className={styles.mapContainer}>
			<MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => (
					<Marker key={city.id} position={[city.position.lat, city.position.lng]}>
						<Popup>
							<span className={`fi fi-${city.countryCode.toLowerCase()}`}></span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
