import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import StatusBadge from '../components/StatusBadge';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await API.get(`/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load complaint');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const categoryIcons = { Garbage: '🗑️', Pothole: '🕳️', Streetlight: '💡', 'Water Supply': '💧', Other: '📋' };

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-50">
      <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface-50 px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-surface-900 mb-2">Error</h2>
        <p className="text-surface-500 mb-4">{error}</p>
        <Link to="/my-complaints" className="text-primary-600 font-semibold hover:underline">← Back to Complaints</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Link to="/my-complaints" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-primary-600 font-medium mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Complaints
        </Link>

        <div className="bg-white rounded-2xl shadow-xl shadow-surface-900/5 border border-surface-200/60 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-surface-100">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{categoryIcons[complaint.category]}</span>
                <div>
                  <h1 className="text-xl font-bold text-surface-900">{complaint.title}</h1>
                  <p className="text-sm text-surface-500 mt-0.5">{complaint.category}</p>
                </div>
              </div>
              <StatusBadge status={complaint.status} />
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-surface-700 leading-relaxed">{complaint.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Location</h3>
                <p className="text-surface-700 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  {complaint.location}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Filed On</h3>
                <p className="text-surface-700">{formatDate(complaint.createdAt)}</p>
              </div>
            </div>

            {complaint.assignedTo && (
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Assigned To</h3>
                <p className="text-surface-700">{complaint.assignedTo}</p>
              </div>
            )}

            {complaint.resolutionRemark && (
              <div className="p-4 rounded-xl bg-success-400/5 border border-success-400/20">
                <h3 className="text-xs font-semibold text-success-600 uppercase tracking-wider mb-2">Resolution Remark</h3>
                <p className="text-surface-700">{complaint.resolutionRemark}</p>
              </div>
            )}

            {complaint.image && (
              <div>
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Attached Image</h3>
                <img src={complaint.image} alt="Complaint" className="rounded-xl max-h-80 object-cover border border-surface-200" />
              </div>
            )}

            {complaint.citizen && (
              <div className="pt-4 border-t border-surface-100">
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-2">Filed By</h3>
                <p className="text-surface-700 font-medium">{complaint.citizen.name}</p>
                <p className="text-surface-500 text-sm">{complaint.citizen.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
