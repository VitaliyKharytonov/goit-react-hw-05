import css from './MovieDetails.module.css'

const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'


export default function MovieDetails({movie}) {
    const { title, overview, vote_average, poster_path, genres, release_date } = movie;
    console.log(movie);

    return (
        <section className={css.section}>
            <img src={poster_path?`https://image.tmdb.org/t/p/w500${poster_path}`:defaultImg} alt={title} className={css.image} width="250"/>
            <ul className={css.list}>
                <li className={css.item}>
                    <h2>{title}</h2>
                    <p>Popularity {Math.ceil(vote_average)}/10</p>
                </li>
                <li className={css.item}>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                </li>
                <li className={css.item}>
                    <h3>Genres</h3>
                    <p>{genres.map((ganer)=>`${ganer.name} `)}</p>
                </li>
                <li className={css.item}>
                    <h3>Release date</h3>
                    <p>{release_date}</p>
                </li>
            </ul>
        </section>  
    )
}