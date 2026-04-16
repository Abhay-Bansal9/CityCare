import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const FileComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const categories = ['Garbage', 'Pothole', 'Streetlight', 'Water Supply', 'Other'];

  const categoryIcons = {
    Garbage: '🗑️',
    Pothole: '🕳️',
    Streetlight: '💡',
    'Water Supply': '💧',
    Other: '📋',
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await API.post('/complaints', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/my-complaints');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to file complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-50 px-4">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-success-400/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Complaint Filed Successfully!</h2>
          <p className="text-surface-500 mb-1">Your complaint has been registered.</p>
          <p className="text-surface-400 text-sm">Redirecting to your complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900">File a Complaint</h1>
          <p className="text-surface-500 mt-1">Report a civic issue and we&apos;ll ensure it gets resolved</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-surface-900/5 border border-surface-200/60 p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-danger-400/10 border border-danger-400/20 text-danger-600 text-sm font-medium flex items-center gap-2 animate-fade-in">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-surface-700 mb-1.5">
                Complaint Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Pothole on Main Street"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-surface-700 mb-1.5">
                Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.category === cat
                        ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-500/20'
                        : 'border-surface-200 text-surface-600 hover:border-surface-300 hover:bg-surface-50'
                    }`}
                  >
                    <span>{categoryIcons[cat]}</span>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-surface-700 mb-1.5">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm resize-none"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-surface-700 mb-1.5">
                Location *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Near City Park, Sector 12"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-surface-700 mb-1.5">
                Image URL <span className="text-surface-400 font-normal">(optional)</span>
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Filing Complaint...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Complaint
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileComplaint;
