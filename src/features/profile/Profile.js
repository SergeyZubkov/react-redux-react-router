import {useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import './Profile.css';

import {useDispatch, useSelector} from 'react-redux';
import { fetchUserById } from './profileSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const {status, data, error} = useSelector(state => state.profile)
    const {userId} = useSelector(state => state.authorization)

    useEffect(
        () => {
            if (status === 'idle') {
                dispatch(fetchUserById(userId))
            }
        }
    , [status])

    if (status === 'idle') return ''

    if (status === 'loading') return 'loading...'

    if (error) return <Alert variant="danger"> {error} </Alert>

    const {city, languages, social} = data

    let socialFirstWebsite = [
        ...social.filter(s => s.label === 'web'), 
        ...social.filter(s => s.label !== 'web')
    ]

    return (
        <div className="profile">
            <div className='city'>
                Город: {city}
            </div>
            <div className="langs">
                <p>Знанение языков:</p>
                <ul>
                    {languages.map(l => <li key={l}>{l}</li>)}
                </ul>
            </div>
            <div className="social">
                <p>Ссылки:</p>
                <ul>
                    {socialFirstWebsite.map(
                        s => <li key={s.label}>
                                <a href={s.link} title={s.label}>
                                    <img src={`/icons/${s.label}.png`} alt={s.label} />
                                </a>
                            </li>
                    )}
                </ul>
            </div>
        </div>
    )
}