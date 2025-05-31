import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/Authcontext.jsx';
import Home from './Components/Home.jsx';
import Article from './Components/Article.jsx';
import About from './Components/About.jsx';
import Themes from './Components/Themes.jsx';
import Contact from './Components/Contact.jsx';
import Privacy from './Components/Privacy.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import CreateArticle from './Components/CreateArticle.jsx';
import AdminDashboard from './Components/AdminDashboard';
import Navbar from './Components/Navbar.jsx';
import './index.css';
import { AuthProvider } from './Context/Authcontext.jsx';

// Protected Route component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user || !['editor', 'admin'].includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/about" element={<About />} />
              <Route path="/themes" element={<Themes />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create-article"
                element={
                  <ProtectedRoute>
                    <CreateArticle />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;