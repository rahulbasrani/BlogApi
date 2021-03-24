import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../App';
import ArticleItem from '../components/ArticleItem';
import Loader from '../components/Loader';

export default function UserPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/users/${params.userId}`)
      .then(res => res.json())
      .then(json => setUser(json.data.user))
      .then(() => fetch(`${API_URL}/users/${params.userId}/articles`)
        .then(res => res.json())
        .then(json => {
          setArticles(json.data.articles);
          setLoading(false);
        }));
  }, [params])

  useEffect(() => {
    if (user) {
      document.title = `${user.firstName} ${user.lastName} - Odinblog`
    }
  }, [user])

  if (loading) return <Loader />;

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-3">
            <h5>{user.firstName} {user.lastName}</h5>
            <p>{user.about}</p>
          </div>
          <div className="col-9">
            {articles.map(article => (
              <ArticleItem key={article._id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
