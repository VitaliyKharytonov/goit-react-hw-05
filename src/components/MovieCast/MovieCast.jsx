import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { getMovieCast } from "../../movie-api"
import css from './MovieCast.module.css'

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'


export default function MovieCast() {
    const { movieId } = useParams();
    
    const [cast, setCast] = useState([])

    useEffect(() => {
        async function feachCast() {
            const data = await getMovieCast(movieId)
            setCast(data)
         }
        
        feachCast()
    }, [movieId])
    return (
        <ul className={css.list}>
            {cast.map(({id, profile_path, name}) => (
                <li key={id} className={css.item}>
                    <img src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}`: defaultImg} alt={name} className={css.image} width="100px"/>
                    <h3 className={css.name}>{name}</h3>
                </li>)
            )  
            }
        </ul>
    )
}