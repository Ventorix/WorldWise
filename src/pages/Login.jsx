import Button from '../components/Button';
import PageNav from '../components/PageNav';
import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');

	const navigate = useNavigate();

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button onClick={() => navigate('/app', { replace: true })} type='primary'>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
