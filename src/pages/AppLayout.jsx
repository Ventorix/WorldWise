import User from '../components/User';
import styles from './AppLayout.module.css';

function AppLayout() {
	return (
		<div className={styles.app}>
			<User />
		</div>
	);
}

export default AppLayout;
