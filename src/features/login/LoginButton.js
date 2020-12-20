import {Button} from 'react-bootstrap';
import {signout} from './authorizationSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function LoginButton() {
    const auth = useSelector(state => state.authorization)
    const history = useHistory();
    const dispatch = useDispatch();

    return (
            auth.userId
            ? <Button onClick={() => dispatch(signout())}>Выйти</Button>
            : <Button onClick={() => history.push('/login')}>Войти</Button>
    )
}