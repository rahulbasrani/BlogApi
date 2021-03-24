import { useEffect } from 'react';
import Loader from '../components/Loader';
import useArticles from '../hooks/useArticles';
import { JWT_KEY } from '../context/authContext';
import ArticleItem from '../components/ArticleItem';
import { API_URL } from '../App';

export default function HomePage() {
  const { loading, error, articles, setArticles } = useArticles('?sort=-createdAt');

  const onArticleDeleteClick = async articleSlug => {
    const res = await fetch(`${API_URL}/articles/${articleSlug}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`}
    });
    if (res.ok) {
      const newArticles = articles.filter(article => article.slug !== articleSlug)
      setArticles(newArticles)
    }
  }

  useEffect(() => {
    document.title = 'Home - Odinblog'
  }, [])

  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <div className="row">
      <div className="col-8">
        <div className="row">
          {articles.map(article => (
            <ArticleItem
              key={article._id}
              article={article}
              onDeleteClick={onArticleDeleteClick} />
          ))}        
        </div>
      </div>
    </div>
  );
}
