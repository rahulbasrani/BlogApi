import moment from 'moment';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function ArticleItem({ article, onDeleteClick }) {
  const { me } = useContext(AuthContext)
  return (
    <div className="row mb-3">
      <div className="col-12">
        <h1 className="fs-4">
          <Link
            className="text-decoration-none"
            to={`/a/${article.slug}`}
          >
            {article.title}
          </Link>
        </h1>
      </div>
      <div className="col-12">
        <p>
          <Link
            className="text-decoration-none"
            to={`/u/${article.author._id}`}
          >
            {article.author.firstName} {article.author.lastName}
          </Link>
          {' · '}
          {moment(article.createdAt).fromNow()}
          {' · '}
          {article.views} views
          {' · '}
          {me && article.author._id === me._id ? (
            <i
              role="button"
              className="text-danger"
              onClick={() => onDeleteClick(article.slug)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </i>
          ) : null}
        </p>
      </div>
    </div>
  );
}