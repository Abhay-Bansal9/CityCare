import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-surface-200/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xl font-extrabold gradient-text tracking-tight">CityCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {!user && (
              <>
                <Link to="/" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  Home
                </Link>
                <Link to="/login" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  Login
                </Link>
                <Link to="/register" className="ml-3 px-6 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary">
                  Get Started
                </Link>
              </>
            )}

            {user && user.role === 'citizen' && (
              <>
                <Link to="/dashboard" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  Dashboard
                </Link>
                <Link to="/file-complaint" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  File Complaint
                </Link>
                <Link to="/my-complaints" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  My Complaints
                </Link>
              </>
            )}

            {user && user.role === 'admin' && (
              <>
                <Link to="/admin" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  Dashboard
                </Link>
                <Link to="/admin/complaints" className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  All Complaints
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-surface-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-sm font-bold uppercase shadow-md">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-surface-800 leading-tight">{user.name}</span>
                    <span className="text-xs text-surface-400 capitalize">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-surface-500 hover:text-danger-600 hover:bg-danger-400/10 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-surface-500 hover:bg-surface-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-5 border-t border-surface-200/50 animate-fade-in">
            <div className="flex flex-col gap-1.5">
              {!user && (
                <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">Home</Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">Login</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-white btn-primary text-center mt-2">Get Started</Link>
                </>
              )}

              {user && user.role === 'citizen' && (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">Dashboard</Link>
                  <Link to="/file-complaint" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">File Complaint</Link>
                  <Link to="/my-complaints" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">My Complaints</Link>
                </>
              )}

              {user && user.role === 'admin' && (
                <>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">Dashboard</Link>
                  <Link to="/admin/complaints" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 rounded-xl text-sm font-medium text-surface-600 hover:bg-primary-50 hover:text-primary-600">All Complaints</Link>
                </>
              )}

              {user && (
                <div className="mt-4 pt-4 border-t border-surface-200/50 flex items-center justify-between px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-sm font-bold uppercase">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-surface-800 block">{user.name}</span>
                      <span className="text-xs text-surface-400 capitalize">{user.role}</span>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="px-4 py-2 rounded-xl text-xs font-semibold text-danger-600 hover:bg-danger-400/10 transition-all">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
