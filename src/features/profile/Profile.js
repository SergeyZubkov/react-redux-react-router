import {useState, useEffect} from 'react';
import './Profile.css';

export default function Profile() {
    const [user, setUser] = useState(
        {city: "", languages: [], social: []}
    );

    useEffect(
        () => {
            fetch("https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/1")
            .then(res => res.json())
            .then(res => setUser(res.data))
        }
    , [])

    const {city, languages, social} = user|| {city: "", languages: [], social: []};

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