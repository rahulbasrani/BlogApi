import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function SignInPage() {
  const history = useHistory()
  const { me, signIn } = useContext(AuthContext);
  
  const [userValues, setUserValues] = useState({
    email: '', password: '',
  });

  const onChange = e => setUserValues({ ...userValues, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    signIn(userValues);
    history.push('/');
  };

  useEffect(() => {
    document.title = 'Sign In - Odinblog'
  }, [])

  if (me) return history.goBack();

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-6">
        <h2 className="text-center mb-5">Sign In</h2>
        <form className="needs-validation" onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={onChange}
              value={userValues.email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={onChange}
              value={userValues.password}
            />
          </div>

          <div className="d-grid">
            <Link className="text-center mb-3" to="/sign-up">Need an account?</Link>
            <button
              className="btn btn-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
