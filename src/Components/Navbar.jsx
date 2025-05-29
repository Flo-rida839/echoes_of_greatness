import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-ancient-parchment text-amber-900 shadow-sm">
      <div className="container">
        <Link className="navbar-brand elegant-drop-shadow" to="/">
          <h1 className="mb-0">Echoes of Greatness</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/themes">
                Themes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/privacy">
                Privacy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-amber btn-sm mx-2 my-1 font-noto text-white hover-scale" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-amber btn-sm mx-2 my-1 font-noto text-white hover-scale" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;