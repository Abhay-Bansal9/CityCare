import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';

const ManageComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ status: '', assignedTo: '', resolutionRemark: '' });

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await API.get(`/complaints/${id}`);
        setComplaint(res.data);
        setFormData({
          status: res.data.status,
          assignedTo: res.data.assignedTo || '',
          resolutionRemark: res.data.resolutionRemark || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load complaint');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); setError(''); setSuccess('');
    try {
      const res = await API.put(`/admin/complaints/${id}`, formData);
      setComplaint(res.data);
      setSuccess('Complaint updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  const categoryIcons = { Garbage: '🗑️', Pothole: '🕳️', Streetlight: '💡', 'Water Supply': '💧', Other: '📋' };
  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-50">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );

  if (error && !complaint) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-50 px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-surface-900 mb-2">Error</h2>
        <p className="text-surface-500 mb-4">{error}</p>
        <Link to="/admin/complaints" className="text-primary-600 font-semibold hover:underline">← Back</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Link to="/admin/complaints" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-primary-600 font-medium mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to All Complaints
        </Link>

        {/* Complaint Info */}
        <div className="bg-white rounded-2xl shadow-xl shadow-surface-900/5 border border-surface-200/60 overflow-hidden mb-6">
          <div className="p-8 border-b border-surface-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{categoryIcons[complaint.category]}</span>
                <div>
                  <h1 className="text-xl font-bold text-surface-900">{complaint.title}</h1>
                  <p className="text-sm text-surface-500 mt-0.5">{complaint.category} • {formatDate(complaint.createdAt)}</p>
                </div>
              </div>
              <StatusBadge status={complaint.status} />
            </div>
          </div>
          <div className="p-8 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Description</h3>
              <p className="text-surface-700 text-sm leading-relaxed">{complaint.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Location</h3>
                <p className="text-surface-700 text-sm">{complaint.location}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Filed By</h3>
                <p className="text-surface-700 text-sm">{complaint.citizen?.name} ({complaint.citizen?.email})</p>
              </div>
            </div>
            {complaint.image && (
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1">Image</h3>
                <img src={complaint.image} alt="Complaint" className="rounded-xl max-h-60 object-cover border border-surface-200" />
              </div>
            )}
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white rounded-2xl shadow-xl shadow-surface-900/5 border border-surface-200/60 p-8">
          <h2 className="text-lg font-bold text-surface-900 mb-6">Update Complaint</h2>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-success-400/10 border border-success-400/20 text-success-600 text-sm font-medium animate-fade-in">
              ✅ {success}
            </div>
          )}
          {error && complaint && (
            <div className="mb-6 p-4 rounded-xl bg-danger-400/10 border border-danger-400/20 text-danger-600 text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-1.5">Status</label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                <option value="Registered">Registered</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-1.5">Assigned To (Department)</label>
              <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} placeholder="e.g., Public Works Dept."
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-700 mb-1.5">Resolution Remark</label>
              <textarea name="resolutionRemark" value={formData.resolutionRemark} onChange={handleChange} placeholder="Add resolution details..." rows={3}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-surface-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none" />
            </div>
            <button type="submit" disabled={updating}
              className="w-full py-3 rounded-xl btn-primary text-white font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
              {updating ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Updating...</>
              ) : 'Update Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageComplaint;
