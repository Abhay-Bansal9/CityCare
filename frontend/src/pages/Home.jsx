import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: 'File Complaints',
      description: 'Report civic issues like potholes, garbage, broken streetlights, and water supply problems with a simple form.',
      color: 'from-primary-500 to-primary-700',
      shadow: 'shadow-primary-500/20',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Track Status',
      description: 'Monitor the real-time progress of your complaints from registration through resolution with live updates.',
      color: 'from-accent-500 to-accent-700',
      shadow: 'shadow-accent-500/20',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Admin Management',
      description: 'Administrators can view, assign, and resolve complaints with detailed tracking and powerful analytics.',
      color: 'from-success-500 to-success-600',
      shadow: 'shadow-success-500/20',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Complaints Resolved' },
    { value: '50+', label: 'City Departments' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' },
  ];

  const steps = [
    { step: '01', title: 'Create Account', desc: 'Sign up as a citizen or admin in seconds' },
    { step: '02', title: 'Report Issue', desc: 'File a detailed complaint with category & location' },
    { step: '03', title: 'Track Progress', desc: 'Monitor real-time updates on your complaint' },
    { step: '04', title: 'Issue Resolved', desc: 'Get notified when your complaint is resolved' },
  ];

  return (
    <div className="min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primary-300/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-32 md:pt-28 md:pb-40 lg:pt-36 lg:pb-48">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-10 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse"></span>
              Smart Civic Solutions
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 animate-slide-in-up tracking-tight">
              Your City, Your Voice,{' '}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200">
                Our Responsibility
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100/80 mb-12 leading-relaxed max-w-2xl mx-auto animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              Report civic issues, track resolutions, and help make your city a better place to live. CityCare connects citizens directly with city administration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="px-10 py-4 rounded-2xl bg-white text-primary-700 font-bold text-base hover:bg-blue-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-10 py-4 rounded-2xl bg-white text-primary-700 font-bold text-base hover:bg-blue-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Get Started Free →
                  </Link>
                  <Link
                    to="/login"
                    className="px-10 py-4 rounded-2xl bg-white/10 text-white border border-white/25 font-bold text-base hover:bg-white/20 transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="relative -mt-6 z-10 mb-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-3xl shadow-xl shadow-surface-900/5 border border-surface-200/60 px-8 py-10 md:px-12 md:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-surface-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS - STEPS ========== */}
      <section className="py-24 md:py-32 bg-surface-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-widest mb-5">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-surface-900 mb-5 tracking-tight">
              Simple Steps, Big Impact
            </h2>
            <p className="text-surface-500 max-w-xl mx-auto text-lg leading-relaxed">
              From reporting to resolution — a seamless experience for every citizen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="relative text-center group">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary-300 to-primary-100"></div>
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 text-xs font-bold uppercase tracking-widest mb-5">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-surface-900 mb-5 tracking-tight">
              Everything You Need
            </h2>
            <p className="text-surface-500 max-w-xl mx-auto text-lg leading-relaxed">
              Powerful tools for citizens and administrators to manage civic complaints efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 stagger-children">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-surface-50 rounded-3xl border border-surface-200/60 p-10 card-hover animate-fade-in opacity-0"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-4">{feature.title}</h3>
                <p className="text-surface-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-28 md:py-36 bg-surface-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-surface-400 text-lg md:text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
            Join thousands of citizens who are actively improving their cities through CityCare.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                to="/register"
                className="px-10 py-4 rounded-2xl btn-primary text-white font-bold text-base"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 rounded-2xl border border-surface-600 text-surface-300 font-bold text-base hover:bg-surface-800 transition-all"
              >
                Login to Your Account
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
