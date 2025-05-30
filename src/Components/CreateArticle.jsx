import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';
import '../styles/create-article.css';

function CreateArticle() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    era: '',
    timeline: [],
    related_figures: [],
    themes: [],
    author_id: user?.id || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableThemes, setAvailableThemes] = useState([]);
  const [availableFigures, setAvailableFigures] = useState([]);
  const [newTimelineEvent, setNewTimelineEvent] = useState({ year: '', event: '' });

  // Fetch available themes and figures for selection
  useEffect(() => {
    console.log('CreateArticle useEffect running');
    const fetchData = async () => {
      try {
        const [themesResponse, figuresResponse] = await Promise.all([
          axios.get('https://flowurr27.pythonanywhere.com/api/themes'),
          axios.get('https://flowurr27.pythonanywhere.com/api/articles')
        ]);
        setAvailableThemes(Array.isArray(themesResponse.data) ? themesResponse.data : []);
        setAvailableFigures(Array.isArray(figuresResponse.data) ? figuresResponse.data : []);
      } catch (err) {
        setError('Failed to load themes');
        console.error('CreateArticle fetch error:', err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Parse author_id as integer, allow empty string for clearing
    const parsedValue = name === 'author_id' ? (value === '' ? '' : parseInt(value, 10)) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setNewTimelineEvent(prev => ({ ...prev, [name]: value }));
  };

  const addTimelineEvent = () => {
    if (newTimelineEvent.year && newTimelineEvent.event) {
      setFormData(prev => ({
        ...prev,
        timeline: [...prev.timeline, newTimelineEvent]
      }));
      setNewTimelineEvent({ year: '', event: '' });
    }
  };

  const removeTimelineEvent = (index) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index)
    }));
  };

  const handleMultiSelectChange = (e, field) => {
    const options = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setFormData(prev => ({ ...prev, [field]: options }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate author_id
    if (!formData.author_id || formData.author_id <= 0) {
      setError('Invalid User ID');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      await axios.post('https://flowurr27.pythonanywhere.com/api/admin/articles', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create article');
      console.error('CreateArticle submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Redirect or show error if not logged in or not authorized
  if (!user || !['editor', 'admin'].includes(user.role)) {
    return (
      <div className="create-article-wrapper ancient-parchment">
        <h1 className="illuminated-title elegant-drop-shadow">Access Denied</h1>
        <p className="medieval-flair">You must be logged in as an editor or admin to create articles.</p>
      </div>
    );
  }

  return (
    <div className="create-article-wrapper ancient-parchment">
      <h1 className="illuminated-title elegant-drop-shadow">Create New Scroll</h1>
      
      {error && (
        <div className="error-message medieval-flair">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="author_id">User ID</label>
          <input
            type="number"
            id="author_id"
            name="author_id"
            value={formData.author_id}
            readOnly
            required
            className="form-input readonly-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows="10"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows="4"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="era">Era</label>
          <select
            id="era"
            name="era"
            value={formData.era}
            onChange={handleInputChange}
            required
            className="form-select"
          >
            <option value="">Select Era</option>
            <option value="Ancient">Ancient</option>
            <option value="Medieval">Medieval</option>
            <option value="Renaissance">Renaissance</option>
            <option value="Modern">Modern</option>
          </select>
        </div>

        <div className="form-group">
          <label>Timeline Events</label>
          <div className="timeline-input-group">
            <input
              type="text"
              name="year"
              value={newTimelineEvent.year}
              onChange={handleTimelineChange}
              placeholder="Year"
              className="form-input timeline-year"
            />
            <input
              type="text"
              name="event"
              value={newTimelineEvent.event}
              onChange={handleTimelineChange}
              placeholder="Event"
              className="form-input timeline-event"
            />
            <button
              type="button"
              onClick={addTimelineEvent}
              className="add-timeline-btn medieval-flair"
            >
              Add Event
            </button>
          </div>
          <div className="timeline-preview">
            {formData.timeline.map((event, index) => (
              <div key={index} className="timeline-item">
                <span>{event.year}: {event.event}</span>
                <button
                  type="button"
                  onClick={() => removeTimelineEvent(index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="related_figures">Related Figures</label>
          <select
            id="related_figures"
            multiple
            onChange={(e) => handleMultiSelectChange(e, 'related_figures')}
            className="form-select"
          >
            {availableFigures.map(figure => (
              <option key={figure.id} value={figure.id}>
                {figure.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="themes">Themes</label>
          <select
            id="themes"
            multiple
            onChange={(e) => handleMultiSelectChange(e, 'themes')}
            className="form-select"
          >
            {availableThemes.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-btn medieval-flair"
        >
          {loading ? 'Inscribing Scroll...' : 'Create Scroll'}
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;