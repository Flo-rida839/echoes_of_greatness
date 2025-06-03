import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import axios from 'axios';
import '../styles/admin-dashboard.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [articleCount, setArticleCount] = useState(0);

  // Fetch dashboard stats (e.g., article count)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No sacred token found');

        const response = await axios.get('https://flowurr27.pythonanywhere.com/api/articles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setArticleCount(response.data.length);
      } catch (error) {
        console.error('Stats fetch error:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && ['editor', 'admin'].includes(user.role)) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Handle loading state
  if (loading) {
    return (
      <div className="admin-dashboard-wrapper ancient-parchment">
        <p className="medieval-flair">Unveiling the Scribe’s Sanctum...</p>
      </div>
    );
  }

  // Handle unauthorized access
  if (!user || !['editor', 'admin'].includes(user.role)) {
    return (
      <div className="admin-dashboard-wrapper ancient-parchment">
        <h1 className="illuminated-title elegant-text" aria-label="Access Denied">
          Access Forbidden
        </h1>
        <p className="medieval-flair">Only scribes of high rank may enter this sanctum.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper ancient-parchment">
      <h1 className="illuminated-title elegant-text" aria-label="Scribe’s Sanctum">
        Scribe’s Sanctum
      </h1>
      <p className="medieval-flair">
        Welcome, {user.username || 'Noble Scribe'}, to the sacred hall of creation.
      </p>
      <p className="medieval-flair">
        Scrolls inscribed: {articleCount}
      </p>
      <div className="dashboard-options">
        <Link
          to="/admin/create-article"
          className="btn btn-amber font-noto text-white hover-scale"
          aria-label="Create New Scroll"
        >
          Craft New Scroll
        </Link>
        {/* Placeholder for future options */}
        {user.role === 'admin' && (
          <Link
            to="/admin/manage-users"
            className="btn btn-amber font-noto text-white hover-scale"
            aria-label="Manage Scribes"
          >
            Manage Scribes
          </Link>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;