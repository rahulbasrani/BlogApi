import MDEditor from '@uiw/react-md-editor';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API_URL } from '../App';
import Loader from '../components/loader';
import { AuthContext, JWT_KEY } from '../context/authContext';


export default function EditArticlePage() {
  const history = useHistory()
  const { articleSlug } = useParams();
  const { me } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();
  const [saved, setSaved] = useState(false);

  const onTextChange = text => setArticle({ ...article, text })

  const onSubmit = e => {
    e.preventDefault()
    setSaved(false)

    const body = JSON.stringify({
      title: article.title,
      text: article.text,
      tags: article.tags,
      published: article.published,
    });

    fetch(`${API_URL}/articles/${articleSlug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
      },
      body
    }).then(res => res.json()).then(json => console.log(json));

    setSaved(true);
  }

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`${API_URL}/articles/${articleSlug}`);
      const json = await res.json();
      setArticle(json.data.article);
      setLoading(false);
    }
    fetchArticle()
  }, [articleSlug]);

  useEffect(() => {
    document.title = 'Edit article - Odinblog';
  }, []);

  if (loading) return <Loader />;
  if (!loading &&  me._id !== article.author._id) return history.goBack();

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={onSubmit}>
          { saved ? (
            <div className="alert alert-success" role="alert">
              Article saved.
            </div>
          ) : null}
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              name="title"
              value={article.title}
              onChange={e => setArticle({ ...article, [e.target.name]: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <MDEditor
              value={article.text}
              onChange={onTextChange}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Tags (separate with comma)"
              name="tags"
              value={article.tags}
              onChange={e => setArticle({ ...article, [e.target.name]: e.target.value.split(',').map(tag => tag.trim()) }) }
            />
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label" htmlFor="published">Published</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="published"
              checked={article.published}
              onChange={e => setArticle({ ...article, [e.target.name]: !article.published })}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
