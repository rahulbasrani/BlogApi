import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContext } from './context/authContext';

import Loader from './components/loader';
import Navbar from './components/navbar';

import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';
import HomePage from './pages/homePage';
import NewArticlePage from './pages/newArticlePage';
import ArticlePage from './pages/articlePage';
import MyArticlesPage from './pages/myArticlePage';
import UserPage from './pages/userPage';
import EditArticlePage from './pages/editArticlePage';

export const API_URL = 'https://backend-blog-api-ravi.herokuapp.com/';

function App() {
  const { loading } = useContext(AuthContext)

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <Navbar/>
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