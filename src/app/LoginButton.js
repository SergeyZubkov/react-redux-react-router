import {Button} from 'react-bootstrap';
import {useAuth} from './auth-hook';
import {useHistory} from 'react-router-dom';

export default function LoginButton() {
    const auth = useAuth();
    const history = useHistory();
    return (
            auth.userId
            ? <Button onClick={() => auth.signout()}>Выйти</Button>
            : <Button onClick={() => history.push('/login')}>Войти</Button>
    )
}