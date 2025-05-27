import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Article from './Components/Article.jsx';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import About from './Components/About.jsx';
import Themes from './Components/Themes.jsx';
import './index.css'; // Ensure this imports your global styles

function App() {
  return (
    // <Router> {/* Uncommented and properly placed */}
      <div className="App"> {/* Changed class name to match CSS */}
        <Navbar />
        
        {/* Added content wrapper with parchment effect */}
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/themes" element={<Themes />} />
          </Routes>
        </div>

        <Footer />
      </div>
    // </Router>
  );
}

export default App;