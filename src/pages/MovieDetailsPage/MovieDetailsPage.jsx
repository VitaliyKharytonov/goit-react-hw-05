import { useParams, Link, Outlet, useLocation} from "react-router-dom"
import { Suspense, useEffect, useRef, useState } from 'react'
import MovieDetails from '../../components/MovieDetails/MovieDetails'
import { getMovieBuId } from '../../movie-api'
import { Circles } from 'react-loader-spinner'
import css from './MovieDetailsPage.module.css'


export default function MoviesDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const location = useLocation();
    const backLinkRef=useRef(location.state ?? '/movies')

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getMovieBuId(movieId);
                setMovie(data);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
         }

        fetchMovies()
    }, [movieId])
   

    return (
        <div className={css.container}>
            {isError && <p>Oops! There was an error! Try again!</p>}

            <div className={css.item}>
                <Link to={backLinkRef.current} className={css.link}>Go Back</Link>
            </div>

            <Circles
                height="40"
                width="40" 
                color="#150b9e"
                ariaLabel="circles-loading"
                wrapperClass={css.loader}
                visible={isLoading}
            />

            {movie && <MovieDetails movie={movie} />}

            <div>
                <h3>Additional information</h3>
            
                <ul className={css.list}>
                    <li className={css.item}>
                        <Link to="cast" className={css.link}>Cast</Link>
                    </li>
                    <li className={css.item}>
                        <Link to="reviews" className={css.link}>Reviews</Link>
                    </li>
                </ul>
                
                <Suspense>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    )
}