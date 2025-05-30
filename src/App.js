import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home.jsx';
import Article from './Components/Article.jsx';
import About from './Components/About.jsx';
import Themes from './Components/Themes.jsx';
import './index.css';
import { AuthProvider } from './Context/Authcontext.jsx';
import Privacy from './Components/Privacy.jsx'
import Contact from './Components/Contact.jsx'
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import CreateArticle from './Components/CreateArticle.jsx';
import AdminDashboard from './Components/AdminDashboard';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/createarticle" element={<CreateArticle/>} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
        
      </div>
    </AuthProvider>
  );
}

export default App;
