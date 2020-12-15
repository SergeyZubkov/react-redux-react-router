import {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../../app/auth-hook';
import {useHistory, useLocation} from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null)

    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    
    const {from} = location.state || {from: {pathname: "/"}}

    const handleSubmit = (e) => {
        e.preventDefault()

        if( !validateEmail() ) return
        
        auth.signin(email, password, () => history.replace(from))
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