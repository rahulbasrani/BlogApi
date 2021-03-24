import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../App';
import Comments from '../components/Comments';
import Loader from '../components/Loader';

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [article, setArticle] = useState();

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`${API_URL}/articles/${articleSlug}`);
      const json = await res.json();
      if (res.ok) {
        setArticle(json.data.article);
      } else {
        setError(json.error)
      }
      setLoading(false);
    }
    fetchArticle()
  }, [articleSlug])

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Odinblog`
    }
  }, [article])

  if (error) return <p>Not Found</p>
  if (loading) return <Loader />

  return (
    <div className="row">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-8">
            <h2 className="mb-3">{article.title}</h2>
            <MDEditor.Markdown source={article.text} />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <hr />
            <Comments article={articleSlug} />
          </div>
        </div>
      </div>
    </div>
  );
}