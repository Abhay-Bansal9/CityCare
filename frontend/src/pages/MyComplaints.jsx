import { useState, useEffect } from 'react';
import API from '../api/axios';
import ComplaintCard from '../components/ComplaintCard';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get('/complaints/my');
        setComplaints(res.data);
      } catch (error) {
        console.error('Failed to fetch complaints:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const filteredComplaints = filter === 'all'
    ? complaints
    : complaints.filter((c) => c.status === filter);

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'Registered', label: 'Registered' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900">My Complaints</h1>
          <p className="text-surface-500 mt-1">Track all your submitted complaints</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
          {filters.map((f) => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f.value ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' : 'bg-white border border-surface-200 text-surface-600 hover:border-surface-300'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-surface-200/60 p-5 animate-pulse">
                <div className="h-5 w-48 bg-surface-100 rounded mb-3"></div>
                <div className="h-4 w-full bg-surface-100 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-surface-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-surface-700 mb-2">No complaints found</h3>
            <p className="text-surface-500 text-sm">
              {filter === 'all' ? "You haven't filed any complaints yet." : `No ${filter.toLowerCase()} complaints.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4 stagger-children">
            {filteredComplaints.map(complaint => (
              <div key={complaint._id} className="animate-fade-in opacity-0">
                <ComplaintCard complaint={complaint} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
