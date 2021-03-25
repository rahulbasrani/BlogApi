import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function SignUpPage() {
  const history = useHistory()
  const { me, signUp } = useContext(AuthContext)
  const [newUserValues, setNewUserValues] = useState({
    firstName: '', lastName: '', email: '', password: '', about: ''
  })

  const onChange = e => setNewUserValues({ ...newUserValues, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    signUp(newUserValues)
    history.push('/')
  }

  useEffect(() => {
    document.title = 'Sign Up - Odinblog'
  }, [])

  if (me) return history.goBack()

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-6">
        <h2 className="text-center mb-5">Sign Up</h2>
        <form className="needs-validation" onSubmit={onSubmit} autoComplete="off">
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-3 mb-lg-0">
              <label className="form-label" htmlFor="firstName">First name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                onChange={onChange}
                value={newUserValues.firstName}
              />
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label" htmlFor="lastName">Last name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                onChange={onChange}
                value={newUserValues.lastName}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={onChange}
              value={newUserValues.email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={onChange}
              value={newUserValues.password}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="about">About</label>
            <textarea
              className="form-control"
              name="about"
              onChange={onChange}
              value={newUserValues.about}
            />
          </div>

          <div className="d-grid">
            <Link className="text-center mb-3" to="/sign-in">Have an account?</Link>
            <button
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
