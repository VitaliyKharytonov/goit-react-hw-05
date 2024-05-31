import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { getMovieReviews } from "../movie-api"
import MovieReviewsData from "./MovieReviewsData/MovieReviewsData"




export default function MovieReviews() {
    const { movieId } = useParams()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        async function feachCast() {
            const data = await getMovieReviews(movieId)
            setReviews(data)
         }
        
        feachCast()
    }, [movieId])
    
    return (
        <>
            {reviews.length > 0 ? <MovieReviewsData reviews={reviews} /> : <p>We don`t have any reviews for this movie.</p>}  
        </>
        
    )
}