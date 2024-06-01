import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { getMovieCast } from "../../movie-api"
import css from './MovieCast.module.css'
import { Circles } from 'react-loader-spinner'

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'


export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function feachCast() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieCast(movieId)
                setCast(data)
            } catch {
                 setIsError(true);
            } finally {
                setIsLoading(false);
            }  
         }
        
        feachCast()
    }, [movieId])
    return (
        <>
            {isError && <p>Oops! There was an error! Try again!</p>}

            <Circles
                height="40"
                width="40" 
                color="#150b9e"
                ariaLabel="circles-loading"
                wrapperClass={css.loader}
                visible={isLoading}
            />

            {!isLoading && <ul className={css.list}>
                {cast.map(({id, profile_path, name}) => (
                    <li key={id} className={css.item}>
                        <img src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}`: defaultImg} alt={name} className={css.image} width="100px"/>
                        <h3 className={css.name}>{name}</h3>
                    </li>)
                    )  
                }
            </ul>}
        </>
    )
}