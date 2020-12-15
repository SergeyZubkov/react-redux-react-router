import {useState, useEffect} from 'react';
import './News.css';

export default function News() {
    const [news, setNews] = useState([]);

    useEffect(
        () => {
            fetch(`https://mysterious-reef-29460.herokuapp.com/api/v1/news`)
            .then(res => res.json())
            .then(res => setNews(res.data))
        }
    ,[])
    return (
        <div className="news">
            {news.map(
                n => <div className='new' key={n.title}>
                    <h2>{n.title}</h2>
                    <p>
                        {n.text}
                    </p>
                </div>
            )}
        </div>
    )
}