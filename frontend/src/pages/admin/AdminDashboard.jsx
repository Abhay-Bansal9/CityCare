import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, registered: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Complaints', value: stats.total, icon: '📊', color: 'from-primary-500 to-primary-700', bg: 'bg-primary-50', text: 'text-primary-600' },
    { label: 'Registered', value: stats.registered, icon: '📝', color: 'from-warning-400 to-warning-600', bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'In Progress', value: stats.inProgress, icon: '⏳', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'from-success-400 to-success-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900">Admin Dashboard</h1>
          <p className="text-surface-500 mt-1">Overview of all civic complaints</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 stagger-children">
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-surface-200/60 p-6 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-surface-100 mb-4"></div>
                <div className="h-8 w-16 bg-surface-100 rounded mb-2"></div>
                <div className="h-4 w-24 bg-surface-100 rounded"></div>
              </div>
            ))
          ) : (
            cards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border border-surface-200/60 p-6 card-hover animate-fade-in opacity-0">
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center text-2xl mb-4`}>
                  {card.icon}
                </div>
                <div className="text-3xl font-extrabold text-surface-900 mb-1">{card.value}</div>
                <div className="text-sm text-surface-500 font-medium">{card.label}</div>
              </div>
            ))
          )}
        </div>

        <div className="animate-slide-in-up">
          <Link to="/admin/complaints"
            className="group bg-gradient-to-br from-primary-500 to-accent-600 rounded-2xl p-8 text-white card-hover block">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Manage All Complaints</h3>
                <p className="text-white/70 text-sm">View, filter, and manage all citizen complaints</p>
              </div>
              <svg className="w-8 h-8 text-white/60 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
