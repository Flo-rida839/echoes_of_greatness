import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full bg-parchment text-amber-900 shadow-md z-50">
      <div className="navbar-container container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="navbar-logo">
          <h1 className="text-2xl font-['Cinzel'] font-bold elegant-drop-shadow">
            Echoes of Greatness
          </h1>
        </Link>
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-icon">{isMenuOpen ? '✕' : '☰'}</span>
        </button>
        <ul
          className={`nav-menu md:flex md:items-center md:space-x-6 ${
            isMenuOpen ? 'block' : 'hidden'
          } md:block absolute md:static top-full left-0 w-full md:w-auto bg-parchment md:bg-transparent transition-all duration-300`}
        >
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link block py-2 px-4 md:p-0 hover:text-amber-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/themes"
              className="nav-link block py-2 px-4 md:p-0 hover:text-amber-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Themes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-link block py-2 px-4 md:p-0 hover:text-amber-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;