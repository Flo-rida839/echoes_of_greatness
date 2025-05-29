import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/home.css';

function Contact() {
  return (
    <div className="min-h-screen bg-parchment text-amber-900 py-5">
      <Navbar />
      <header className="text-center mb-5 position-relative">
        <div className="header-doodle"></div>
        <h1 className="display-4 font-cinzel fw-bold elegant-drop-shadow">
          Contact the Scribes
        </h1>
        <p className="fs-5 font-noto text-amber-800 mt-2">
          Send us your queries or tales
        </p>
      </header>
      <div className="container">
        <section className="bg-parchment-light border-parchment rounded-3 shadow-sm py-4 px-3">
          <h2 className="fs-3 font-cinzel fw-bold mb-4 elegant-drop-shadow">
            Get in Touch
          </h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label font-noto">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label font-noto">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label font-noto">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Your message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-amber font-noto text-white">
              Send Message
            </button>
          </form>
          <p className="fs-5 font-noto text-amber-900 mt-4">
            Alternatively, reach us at: <a href="mailto:info@chroniclesofantiquity.com" className="text-amber-700">info@echoesofgreatness.com</a>
          </p>
        </section>
      </div>
      <footer className="footer text-center mt-5">
        <img
          src="https://media.giphy.com/media/3o7TKs2z7x2z2z2z2z/giphy.gif"
          alt="Turning book pages"
          className="book-gif mb-3"
          onError={(e) => (e.target.src = 'https://i.ibb.co/5Y0Z7pS/book.png')}
        />
        <p className="font-noto mb-2">
          © {new Date().getFullYear()} Echoes of Greatness. All rights reserved.
        </p>
        <div className="footer-links">
          <Link to="/about" className="font-noto mx-2">About</Link>
          <Link to="/contact" className="font-noto mx-2">Contact</Link>
          <Link to="/privacy" className="font-noto mx-2">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

export default Contact;