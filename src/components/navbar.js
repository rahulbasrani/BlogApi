import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'bootstrap'
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const { me, signOut } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const collapse = new Collapse(document.getElementById('collapseTarget'), { toggle: false })
    toggle ? collapse.show() : collapse.hide()
  }, [toggle]);

  return (
    <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Odinblog</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setToggle(toggle => !toggle)}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapseTarget">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {me ? (
              <li className="nav-item dropdown">
                <span
                  style={{ cursor: 'pointer', }}
                  data-bs-toggle="dropdown"
                >
                  {me.firstName} {me.lastName}
                </span>
                <ul className="dropdown-menu" id="dropdownMenu">
                  <li>
                    <Link className="dropdown-item" to={`/u/${me._id}`}>Profile</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/new-article">Write an article</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-articles">My articles</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/settings">Settings</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button className="dropdown-item" onClick={signOut}>Sign Out</button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/sign-in">Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary" to="/sign-up">Get started</Link>
                </li>
              </>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}
