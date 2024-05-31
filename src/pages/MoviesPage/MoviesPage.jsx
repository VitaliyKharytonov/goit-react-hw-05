import { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList/MovieList'
import SearchBar from '../../components/SearchBar/SearchBar'
import { getMovieSearch } from '../../movie-api'
import { Circles } from 'react-loader-spinner'
import css from './MoviesPage.module.css'


export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            return;
        }
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieSearch(searchQuery);
                setMovies(data.results)
            } catch {
            setIsError(true);
            } finally {
            setIsLoading(false);
            }
         }

        fetchMovies()
    }, [searchQuery])

    const handleSearch = async (query) => {
        setSearchQuery(query);
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