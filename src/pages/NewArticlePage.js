import MDEditor from '@uiw/react-md-editor';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../App';
import { AuthContext, JWT_KEY } from '../context/authContext';

export default function NewArticlePage() {
  const { me } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setSaved(false);

    const body = JSON.stringify({
      title,
      text,
      tags: tags.split(',').map(tag => tag.trim()),
      published,
    });
    fetch(`${API_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
      },
      body,
    });
    setSaved(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaved(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, [saved]);

  useEffect(() => {
    document.title = 'Write an article - Odinblog'
  }, [])

  if (!me) return <Redirect to="/sign-in" />;

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
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <MDEditor
              value={text}
              onChange={setText}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Tags (separate with comma)"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
          <div className="form-check mb-3">
            <label className="form-check-label" htmlFor="published">Published</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="published"
              value={published}
              onChange={e => setPublished(published => !published)}
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
