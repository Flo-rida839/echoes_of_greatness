import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/home.css';

function Privacy() {
  return (
    <div className="min-h-screen bg-parchment text-amber-900 py-5">
      <Navbar />
      <header className="text-center mb-5 position-relative">
        <div className="header-doodle"></div>
        <h1 className="display-4 font-cinzel fw-bold elegant-drop-shadow">
          Privacy Policy
        </h1>
        <p className="fs-5 font-noto text-amber-800 mt-2">
          Safeguarding your trust
        </p>
      </header>
      <div className="container">
        <section className="bg-parchment-light border-parchment rounded-3 shadow-sm py-4 px-3">
          <h2 className="fs-3 font-cinzel fw-bold mb-4 elegant-drop-shadow">
            Our Commitment
          </h2>
          <p className="fs-5 font-noto text-amber-900">
            At Echoes of Greatness, we value your privacy. This policy outlines how we collect, use, and protect your information when you visit our site.
          </p>
          <h3 className="fs-4 font-cinzel fw-semibold mt-4 mb-3">
            Information We Collect
          </h3>
          <p className="fs-5 font-noto text-amber-900">
            We may collect personal information (e.g., name, email) when you submit forms or interact with our services. We also use cookies to enhance your browsing experience.
          </p>
          <h3 className="fs-4 font-cinzel fw-semibold mt-4 mb-3">
            How We Use Your Information
          </h3>
          <p className="fs-5 font-noto text-amber-900">
            Your information is used to improve our content, respond to inquiries, and personalize your experience. We do not share your data with third parties without consent.
          </p>
          <h3 className="fs-4 font-cinzel fw-semibold mt-4 mb-3">
            Contact Us
          </h3>
          <p className="fs-5 font-noto text-amber-900">
            For privacy-related questions, email us at <a href="mailto:privacy@chroniclesofantiquity.com" className="text-amber-700">privacy@echoesofgreatness.com</a>.
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

export default Privacy;