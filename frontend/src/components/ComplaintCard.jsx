import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const ComplaintCard = ({ complaint }) => {
  const categoryIcons = {
    Garbage: '🗑️',
    Pothole: '🕳️',
    Streetlight: '💡',
    'Water Supply': '💧',
    Other: '📋',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link
      to={`/complaints/${complaint._id}`}
      className="block card-hover"
    >
      <div className="bg-white rounded-2xl border border-surface-200/60 p-5 hover:border-primary-300/60 transition-all duration-300 group">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="text-2xl flex-shrink-0" role="img" aria-label={complaint.category}>
              {categoryIcons[complaint.category] || '📋'}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-surface-900 truncate group-hover:text-primary-600 transition-colors">
                {complaint.title}
              </h3>
              <p className="text-sm text-surface-500 mt-0.5">{complaint.category}</p>
            </div>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        <p className="text-sm text-surface-600 line-clamp-2 mb-4 leading-relaxed">
          {complaint.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-surface-100">
          <div className="flex items-center gap-1.5 text-xs text-surface-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate max-w-[180px]">{complaint.location}</span>
          </div>
          <span className="text-xs text-surface-400">
            {formatDate(complaint.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ComplaintCard;
