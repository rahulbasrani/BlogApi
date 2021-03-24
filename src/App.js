import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContext } from './context/authContext';

import Loader from './components/Loader';
import Navbar from './components/Navbar';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import NewArticlePage from './pages/NewArticlePage';
import ArticlePage from './pages/ArticlePage';
import MyArticlesPage from './pages/MyArticlesPage';
import UserPage from './pages/UserPage';
import EditArticlePage from './pages/EditArticlePage';

export const API_URL = 'https://quiet-hollows-84016.herokuapp.com/api';

function App() {
  const { loading } = useContext(AuthContext)

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/sign-up" exact>
            <SignUpPage />
          </Route>
          <Route path="/sign-in" exact>
            <SignInPage />
          </Route>
          <Route path="/new-article" exact>
            <NewArticlePage />
          </Route>
          <Route path="/a/:articleSlug/edit">
            <EditArticlePage />
          </Route>
          <Route path="/a/:articleSlug">
            <ArticlePage />
          </Route>
          <Route path="/my-articles" exact>
            <MyArticlesPage />
          </Route>
          <Route path="/u/:userId">
            <UserPage />
          </Route>
          <Route path="/settings" exact>
            <h1>In Developing</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
