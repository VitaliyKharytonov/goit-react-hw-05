import { Link, useLocation } from 'react-router-dom';
import css from './MovieElements.module.css'

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'


export default function MovieElements({ movie }) {

    const location = useLocation();

    return (
        <Link to={`/movies/${movie.id}`} className={css.link} state={location}>
            
            <div className={css.container}>
                <h3 className={css.title}>{movie.original_title}</h3>
                <img src={movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie.poster_path}`:defaultImg} alt="" className={css.image} />
            </div>    
        </Link>
)}