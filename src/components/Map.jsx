import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation.js';
import styles from './Map.module.css';
import Button from './Button';

function Map() {
	const { cities } = useCities();
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();
	const [searchParams] = useSearchParams();
	const [mapPosition, setMapPosition] = useState([40, 0]);

	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
	}, [geolocationPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type={'position'} onClick={getPosition}>
					{isLoadingPosition ? 'Loading' : 'Use your position'}
				</Button>
			)}
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
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position, 5);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvent({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
