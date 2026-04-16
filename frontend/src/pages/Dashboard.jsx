import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, resolved: 0, inProgress: 0, registered: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/complaints/my');
        const complaints = res.data;
        setStats({
          total: complaints.length,
          resolved: complaints.filter((c) => c.status === 'Resolved').length,
          inProgress: complaints.filter((c) => c.status === 'In Progress').length,
          registered: complaints.filter((c) => c.status === 'Registered').length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Filed',
      value: stats.total,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-primary-500 to-primary-700',
      bg: 'bg-primary-50',
      text: 'text-primary-600',
    },
    {
      label: 'Registered',
      value: stats.registered,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-warning-400 to-warning-600',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-success-400 to-success-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900">
            Welcome back, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="text-surface-500 mt-1">Here&apos;s an overview of your complaints</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 stagger-children">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-surface-200/60 p-6 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-surface-100 mb-4"></div>
                <div className="h-8 w-16 bg-surface-100 rounded mb-2"></div>
                <div className="h-4 w-24 bg-surface-100 rounded"></div>
              </div>
            ))
          ) : (
            statCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-surface-200/60 p-6 card-hover animate-fade-in opacity-0"
              >
                <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.text} mb-4`}>
                  {card.icon}
                </div>
                <div className="text-3xl font-extrabold text-surface-900 mb-1">{card.value}</div>
                <div className="text-sm text-surface-500 font-medium">{card.label}</div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 animate-slide-in-up">
          <Link
            to="/file-complaint"
            className="group bg-gradient-to-br from-primary-500 to-accent-600 rounded-2xl p-8 text-white card-hover"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">File a New Complaint</h3>
            <p className="text-white/70 text-sm">Report a civic issue in your area and help improve your city.</p>
          </Link>

          <Link
            to="/my-complaints"
            className="group bg-white rounded-2xl border border-surface-200/60 p-8 card-hover"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">View My Complaints</h3>
            <p className="text-surface-500 text-sm">Track the status and progress of all your submitted complaints.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
