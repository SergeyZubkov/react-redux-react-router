import {useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import './News.css';

import {useSelector, useDispatch} from 'react-redux';
import {fetchNews} from './newsSlice';

export default function News() {
    const {data, status, error} = useSelector(state => state.news)
    const dispatch = useDispatch()

    useEffect(
        () => {
            if (status === 'idle') {
                dispatch(fetchNews())
            }
        }
    ,[status])
    if (status === 'idle') return ''
    if (status === 'loading') return 'loading...'
    if (status === 'failed') return <Alert variant="danger"> {error} </Alert>
    return (
        <div className="news">
            {data.map(
                n => <div className='new' key={n.title}>
                    <h2>{n.title}</h2>
                    <p>
                        {n.text}
                    </p>
                </div>
            )}
            <div className='news__count'>
                Количество новостей: {data.length}
            </div>
        </div>
    )
}