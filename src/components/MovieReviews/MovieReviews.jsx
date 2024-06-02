import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../movie-api";
import MovieReviewsData from "../MovieReviewsData/MovieReviewsData";
import { Circles } from "react-loader-spinner";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function feachCast() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    feachCast();
  }, [movieId]);

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

      {reviews.length > 0 ? (
        <MovieReviewsData reviews={reviews} />
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </>
  );
}
