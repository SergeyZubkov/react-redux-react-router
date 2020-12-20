import {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {signin} from './authorizationSlice';
import {unwrapResult} from '@reduxjs/toolkit';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null)

    const auth = useSelector(state => state.authorization);
    const history = useHistory();

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        if( !validateEmail() ) return

        dispatch(signin({email, password}))
        .then(r => unwrapResult(r))
        .then(r => history.replace('/profile'))
        .catch(e => setPassword(''))
    }

    const validateEmail = () => {
        if (/.+@.+\..+/i.test(email) ) {
            setEmailError(false)
            return true
        } 
        else {
            setEmailError(true)
            return false
        }

    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const o = {
            email: setEmail,
            password: setPassword
        }

        if(name) o[name](value)
    }
    
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            console.log(e.key)
        }
    }
    return (
        <div className="login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="email" value={email} onChange={handleChange} />
                    {emailError&&<Alert variant="danger"> Введите корректный адрес эл. почты </Alert>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Пароль" value={password} onChange={handleChange}/>
                </Form.Group>
                {auth.error&&<Alert variant="danger"> {auth.error} </Alert>}
                <Button variant="primary" type="submit" onClick={handleSubmit} >
                    Логин
                </Button>
            </Form>
        </div>
    )
}