import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton({ children }) {
	const navigate = useNavigate();

	return (
		<Button
			type={'back'}
			onClick={(e) => {
				e.preventDefault();
				navigate(-1);
			}}>
			&larr; {children}
		</Button>
	);
}

export default BackButton;
