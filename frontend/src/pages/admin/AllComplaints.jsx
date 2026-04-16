import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import StatusBadge from '../../components/StatusBadge';

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'all') params.append('status', statusFilter);
        if (categoryFilter !== 'all') params.append('category', categoryFilter);
        const res = await API.get(`/admin/complaints?${params.toString()}`);
        setComplaints(res.data);
      } catch (error) {
        console.error('Failed to fetch complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [statusFilter, categoryFilter]);

  const statuses = ['all', 'Registered', 'In Progress', 'Resolved'];
  const categories = ['all', 'Garbage', 'Pothole', 'Streetlight', 'Water Supply', 'Other'];

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900">All Complaints</h1>
          <p className="text-surface-500 mt-1">Manage complaints from all citizens</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-surface-200/60 p-5 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-surface-500 mb-1.5 uppercase tracking-wider">Status</label>
              <select value={statusFilter} onChange={(e) => { setLoading(true); setStatusFilter(e.target.value); }}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                {statuses.map(s => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-surface-500 mb-1.5 uppercase tracking-wider">Category</label>
              <select value={categoryFilter} onChange={(e) => { setLoading(true); setCategoryFilter(e.target.value); }}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-surface-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-surface-200/60 p-6 animate-pulse">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex gap-4 py-4 border-b border-surface-100 last:border-0">
                <div className="h-4 w-1/4 bg-surface-100 rounded"></div>
                <div className="h-4 w-1/6 bg-surface-100 rounded"></div>
                <div className="h-4 w-1/6 bg-surface-100 rounded"></div>
                <div className="h-4 w-1/6 bg-surface-100 rounded"></div>
                <div className="h-4 w-1/6 bg-surface-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-surface-200/60">
            <p className="text-surface-500">No complaints found matching your filters.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-surface-200/60 overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Title</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Citizen</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Date</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-surface-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(c => (
                    <tr key={c._id} className="border-b border-surface-50 hover:bg-surface-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-surface-900 max-w-[200px] truncate">{c.title}</td>
                      <td className="px-6 py-4 text-sm text-surface-600">{c.citizen?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-surface-600">{c.category}</td>
                      <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                      <td className="px-6 py-4 text-sm text-surface-500">{formatDate(c.createdAt)}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/admin/complaints/${c._id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllComplaints;
