import css from './MovieReviewsData.module.css'

export default function MovieReviewsData({ reviews }) {
    return (
        <ul className={css.list}>
            {reviews.map(({ author, content, id }) => 
                <li key={id} className={css.item}>
                    <h3>{author}</h3>
                    <p className={css.content}>{content}</p>
                </li>
            )}
        </ul>
)}