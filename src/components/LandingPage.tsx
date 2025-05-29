import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, CheckCircle, TrendingUp, Award, Sun, Moon } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden min-h-screen w-full">
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200 dark:bg-teal-900 rounded-full opacity-30 blur-3xl animate-pulse-slow z-0" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-400 dark:bg-teal-700 rounded-full opacity-20 blur-3xl animate-pulse-slow z-0" />
        <div className="absolute top-10 right-1/2 translate-x-1/2 w-40 h-40 bg-gradient-to-tr from-teal-300 via-white to-teal-100 dark:from-teal-800 dark:via-gray-900 dark:to-teal-900 rounded-full opacity-40 blur-2xl z-0" />
        {/* Logo and tagline */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center bg-white dark:bg-gray-900 rounded-full shadow-lg p-4 mb-3 animate-pulse-slow border-4 border-teal-100 dark:border-teal-900">
            <Sparkles className="h-14 w-14 text-teal-500 dark:text-teal-400" />
          </span>
          <span className="uppercase tracking-widest text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 px-3 py-1 rounded-full mb-2 shadow-sm">#1 Habit Tracker</span>
        </div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow-lg leading-tight">
          Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 dark:from-teal-400 dark:via-teal-500 dark:to-teal-300 animate-gradient-x">Habits</span>.<br className="hidden md:block" /> <span className="text-teal-500 dark:text-teal-400">Change Your Life.</span>
        </h1>
        <p className="relative z-10 text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          HabitStreaks helps you create, track, and maintain positive habits with beautiful streaks, badges, and analytics. Start your journey to a better you—one day at a time.
        </p>
        <a
          href="#launch-app"
          className="relative z-10 inline-block px-10 py-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-xl font-bold rounded-full shadow-xl hover:scale-105 hover:from-teal-600 hover:to-teal-500 transition-all duration-200 animate-bounce ring-2 ring-teal-300 dark:ring-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400"
          onClick={e => {
            e.preventDefault();
            const el = document.getElementById('launch-app');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              el.animate([
                { boxShadow: '0 0 0 0 rgba(45,212,191,0.7)' },
                { boxShadow: '0 0 0 12px rgba(45,212,191,0.2)' },
                { boxShadow: '0 0 0 0 rgba(45,212,191,0.0)' }
              ], {
                duration: 900,
                easing: 'ease-in-out'
              });
            }
          }}
        >
          Get Started
        </a>
        <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
          <span className="inline-flex items-center bg-white/80 dark:bg-gray-900/80 border border-teal-200 dark:border-teal-800 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm transition-colors duration-300">
            <Calendar className="h-5 w-5 text-teal-400 mr-2" /> Visual Calendar
          </span>
          <span className="inline-flex items-center bg-white/80 dark:bg-gray-900/80 border border-teal-200 dark:border-teal-800 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm transition-colors duration-300">
            <CheckCircle className="h-5 w-5 text-teal-400 mr-2" /> Streaks & Badges
          </span>
          <span className="inline-flex items-center bg-white/80 dark:bg-gray-900/80 border border-teal-200 dark:border-teal-800 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 shadow-sm transition-colors duration-300">
            <TrendingUp className="h-5 w-5 text-teal-400 mr-2" /> Analytics
          </span>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-10 relative" id="get-started">
        {/* Decorative background for features */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2/3 h-40 bg-gradient-to-r from-teal-100 via-white to-teal-100 dark:from-teal-900 dark:via-gray-900 dark:to-teal-900 opacity-40 blur-2xl rounded-full" />
        </div>
        {/* Feature Cards */}
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 flex flex-col items-center group hover:scale-105 hover:shadow-teal-200 dark:hover:shadow-teal-900 transition-all duration-300 border-2 border-teal-100 dark:border-teal-900">
          <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="h-12 w-12 text-teal-500 dark:text-teal-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Visual Habit Calendar</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[96px]">See your progress at a glance with a beautiful, interactive calendar that makes habit tracking fun and rewarding.</p>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300 bg-teal-100 dark:bg-teal-800 px-3 py-1 rounded-full">Stay Organized</span>
        </div>
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 flex flex-col items-center group hover:scale-105 hover:shadow-teal-200 dark:hover:shadow-teal-900 transition-all duration-300 border-2 border-teal-100 dark:border-teal-900">
          <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <CheckCircle className="h-12 w-12 text-teal-500 dark:text-teal-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Streaks & Motivation</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[96px]">Build momentum with daily streaks and unlock achievement badges as you hit new milestones. Motivation, gamified!</p>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300 bg-teal-100 dark:bg-teal-800 px-3 py-1 rounded-full">Get Rewarded</span>
        </div>
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 flex flex-col items-center group hover:scale-105 hover:shadow-teal-200 dark:hover:shadow-teal-900 transition-all duration-300 border-2 border-teal-100 dark:border-teal-900">
          <div className="bg-teal-50 dark:bg-teal-900 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="h-12 w-12 text-teal-500 dark:text-teal-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Insightful Analytics</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[96px]">Track your consistency, visualize your growth, and discover patterns to help you achieve your goals faster.</p>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300 bg-teal-100 dark:bg-teal-800 px-3 py-1 rounded-full">See Progress</span>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-4 relative overflow-hidden">
        {/* Luxury Decorative background shapes for testimonials */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-yellow-100 via-white to-teal-100 dark:from-yellow-900 dark:via-gray-900 dark:to-teal-900 opacity-40 blur-3xl z-0 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200 via-teal-100 to-white dark:from-yellow-900 dark:via-teal-900 dark:to-gray-900 rounded-full opacity-30 blur-2xl z-0 animate-pulse-slow" />
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight drop-shadow-lg">
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-teal-400 to-yellow-300 bg-clip-text text-transparent">What Our Users Say</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-4">
            Join <span className="font-bold text-yellow-600 dark:text-yellow-300">10,000+</span> happy users who have transformed their lives with HabitStreaks.
          </p>
          {/* Trust bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <span className="inline-flex items-center gap-2 text-base text-gray-700 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 px-5 py-2 rounded-full shadow-lg border border-yellow-100 dark:border-yellow-900 font-semibold">
              <Award className="h-5 w-5 text-yellow-400" /> Featured on ProductHunt
            </span>
            <span className="inline-flex items-center gap-2 text-base text-gray-700 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 px-5 py-2 rounded-full shadow-lg border border-yellow-100 dark:border-yellow-900 font-semibold">
              <Sparkles className="h-5 w-5 text-yellow-400" /> 4.9/5 Average Rating
            </span>
            <span className="inline-flex items-center gap-2 text-base text-gray-700 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 px-5 py-2 rounded-full shadow-lg border border-yellow-100 dark:border-yellow-900 font-semibold">
              <CheckCircle className="h-5 w-5 text-yellow-400" /> Trusted by thousands
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto relative z-10">
          {/* Testimonial Card 1 */}
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center group hover:scale-105 hover:shadow-yellow-200 dark:hover:shadow-yellow-900 transition-all duration-300 border-2 border-yellow-100 dark:border-yellow-900 relative backdrop-blur-xl">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya S." className="w-20 h-20 rounded-full border-4 border-yellow-200 dark:border-yellow-700 shadow-xl mb-4 object-cover" />
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-gray-800 dark:text-gray-100 mb-4 text-lg italic font-medium">“I finally stuck to my morning routine for 30 days straight. The streaks and badges kept me going!”</p>
            <span className="text-base font-bold text-gray-900 dark:text-yellow-200">Priya S.</span>
            <span className="text-xs text-gray-500 mt-1">Marketing Manager</span>
          </div>
          {/* Testimonial Card 2 */}
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center group hover:scale-105 hover:shadow-yellow-200 dark:hover:shadow-yellow-900 transition-all duration-300 border-2 border-yellow-100 dark:border-yellow-900 relative backdrop-blur-xl">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex R." className="w-20 h-20 rounded-full border-4 border-yellow-200 dark:border-yellow-700 shadow-xl mb-4 object-cover" />
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-gray-800 dark:text-gray-100 mb-4 text-lg italic font-medium">“The analytics helped me see my progress and stay motivated. Beautiful and easy to use!”</p>
            <span className="text-base font-bold text-gray-900 dark:text-yellow-200">Alex R.</span>
            <span className="text-xs text-gray-500 mt-1">Product Designer</span>
          </div>
          {/* Testimonial Card 3 */}
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center group hover:scale-105 hover:shadow-yellow-200 dark:hover:shadow-yellow-900 transition-all duration-300 border-2 border-yellow-100 dark:border-yellow-900 relative backdrop-blur-xl">
            <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Jamie L." className="w-20 h-20 rounded-full border-4 border-yellow-200 dark:border-yellow-700 shadow-xl mb-4 object-cover" />
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-gray-800 dark:text-gray-100 mb-4 text-lg italic font-medium">“HabitStreaks changed my life. I recommend it to anyone who wants to build better habits.”</p>
            <span className="text-base font-bold text-gray-900 dark:text-yellow-200">Jamie L.</span>
            <span className="text-xs text-gray-500 mt-1">Entrepreneur</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer id="launch-app" className="py-12 px-4 bg-white dark:bg-gray-800 text-center shadow-inner relative overflow-visible">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to start your streak?
          </h2>
          <a
            href="/tracker"
            className="relative group inline-block px-10 py-5 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-2xl font-extrabold rounded-full shadow-2xl hover:scale-110 hover:from-teal-600 hover:to-teal-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-400 ring-4 ring-teal-200 dark:ring-teal-700 animate-bounce mt-14"
            style={{ boxShadow: '0 8px 32px 0 rgba(45,212,191,0.25)' }}
          >
            <span className="flex items-center gap-3">
              🚀 Launch App
              <span className="absolute -right-6 -top-6 animate-ping-slow w-10 h-10 rounded-full bg-teal-400/30 group-hover:bg-teal-500/40 z-0"></span>
            </span>
            <span className="absolute -right-6 -top-6 w-10 h-10 rounded-full bg-teal-400/20 group-hover:bg-teal-500/30 z-0"></span>
          </a>
        </div>
      </footer>

      {/* New: How It Works Section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <span className="bg-teal-100 dark:bg-teal-900 p-4 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-teal-500 dark:text-teal-400" />
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Set Your Habits</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose the habits you want to build and customize them to fit your lifestyle.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="bg-teal-100 dark:bg-teal-900 p-4 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-teal-500 dark:text-teal-400" />
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Track Daily Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">Mark your habits as complete each day and watch your streaks grow.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="bg-teal-100 dark:bg-teal-900 p-4 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-teal-500 dark:text-teal-400" />
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Celebrate Success</h3>
              <p className="text-gray-600 dark:text-gray-300">Earn badges, see your analytics, and stay motivated to keep going!</p>
            </div>
          </div>
        </div>
      </section>

      {/* New: FAQ Section */}
      <section className="bg-teal-50 dark:bg-gray-900 py-16 px-4 border-t border-teal-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-2">Is HabitStreaks free to use?</h3>
              <p className="text-gray-700 dark:text-gray-300">Yes! HabitStreaks is completely free and always will be.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-2">Can I use it on my phone?</h3>
              <p className="text-gray-700 dark:text-gray-300">Absolutely. HabitStreaks is fully responsive and works great on any device.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-2">Do I need to create an account?</h3>
              <p className="text-gray-700 dark:text-gray-300">No sign-up required. Your data is stored safely in your browser.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New: Newsletter Signup Section */}
      <section className="bg-white dark:bg-gray-800 py-16 px-4 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Get Habit Tips & Updates
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Sign up for our newsletter to receive habit-building tips and app updates.</p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          ) : (
            <Sun className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          )}
        </button>
      </div>

      {/*
        To finish setup:
        1. In your tailwind.config.js, add CSS variables for primary colors (see below).
        2. Replace all 'text-teal-500', 'bg-teal-400', etc. with 'text-primary', 'bg-primary', etc. in your JSX.
        3. Add the following CSS to your index.css or a global stylesheet:

        :root[data-color-theme='teal'] {
          --color-primary: #14b8a6;
          --color-primary-light: #5eead4;
          --color-primary-dark: #0f766e;
        }
        :root[data-color-theme='blue'] {
          --color-primary: #3b82f6;
          --color-primary-light: #60a5fa;
          --color-primary-dark: #1e40af;
        }
        :root[data-color-theme='purple'] {
          --color-primary: #a78bfa;
          --color-primary-light: #c4b5fd;
          --color-primary-dark: #6d28d9;
        }
        :root[data-color-theme='orange'] {
          --color-primary: #fb923c;
          --color-primary-light: #fdba74;
          --color-primary-dark: #c2410c;
        }
        :root[data-color-theme='emerald'] {
          --color-primary: #10b981;
          --color-primary-light: #6ee7b7;
          --color-primary-dark: #065f46;
        }

        In tailwind.config.js, extend your theme:
        theme: {
          extend: {
            colors: {
              primary: 'rgb(var(--color-primary) / <alpha-value>)',
            },
          },
        },
      */}
    </div>
  );
};

export default LandingPage;
