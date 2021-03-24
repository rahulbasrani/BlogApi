import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API_URL } from '../App';
import { AuthContext, JWT_KEY } from '../context/authContext';
import Loader from './Loader';

export default function Comments({ article }) {
  const { me } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/articles/${article}/comments`)
      .then(res => res.json())
      .then(json => {
        setComments(json.data.comments);
        setLoading(false);
      })
  }, [article])

  const onAddCommentClick = e => {
    e.preventDefault()

    if (newComment === '') {
      return
    }

    fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
      },
      body: JSON.stringify({
        articleSlug: article,
        text: newComment
      })
    })
      .then(res => res.json())
      .then(json => {
        setComments([json.data.comment, ...comments]);
        setNewComment('');
      });
  }

  if (loading) return <Loader />

  return (
    <div className="row">
      <div className="col">
        {me ? (
          <form className="mb-3">
            <textarea
              className="form-control mb-3"
              placeholder="Write a comment"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={onAddCommentClick}
            >
              Add Comment
            </button>
          </form>
        ) : (
          <p>Please sign in to add a comment.</p>
        )}
        <div className="row">
            {comments.map(comment => (
              <div className="col-12 mb-1 border-bottom" key={comment._id}>
                <h6>
                  <Link
                    className="text-decoration-none"
                    to={`/u/${comment.author._id}`}
                    >
                    {comment.author.firstName} {comment.author.lastName}
                  </Link>
                  {' · '}
                  {moment(comment.createdAt).fromNow()}
                </h6>
               <p>{comment.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
