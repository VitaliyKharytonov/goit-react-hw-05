import { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList/MovieList'
import { Circles } from 'react-loader-spinner'
import { getMovieTrending } from '../../movie-api'
import css from './HomePage.module.css'

export default function HomePage() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieTrending();
                setMovies(data.results)
            } catch {
            setIsError(true);
            } finally {
            setIsLoading(false);
            }
         }

        fetchMovies()
    },[])

    return (
    <div className={css.conteiner}>
            <h2 className={css.title}>Trending today</h2>
            {isError && <p>Oops! There was an error! Try again!</p>}
            <Circles
                height="40"
                width="40" 
                color="#150b9e"
                ariaLabel="circles-loading"
                wrapperClass={css.loader}
                visible={isLoading}
            />
            <MovieList movies={movies} />
    </div>
    
)}