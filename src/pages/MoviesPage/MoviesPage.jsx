import { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList/MovieList'
import SearchBar from '../../components/SearchBar/SearchBar'
import { getMovieSearch } from '../../movie-api'
import { Circles } from 'react-loader-spinner'
import css from './MoviesPage.module.css'
import { useSearchParams } from 'react-router-dom'


export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("query"));
    useEffect(() => {
        // 
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieSearch(searchParams.get("query"));
                setMovies(data.results)
            } catch {
            setIsError(true);
            } finally {
            setIsLoading(false);
            }
         }

        fetchMovies()
    }, [searchParams])

    const handleSearch = async (query) => {
        searchParams.set('query', query)
        setSearchParams(searchParams)
    };
    
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {isError && <p>Oops! There was an error! Try again!</p>}
            <Circles
                height="40"
                width="40" 
                color="#150b9e"
                ariaLabel="circles-loading"
                wrapperClass={css.loader}
                visible={isLoading}
            />
            {movies.length > 0 && <MovieList movies={movies} />}
    </div>
    )
}