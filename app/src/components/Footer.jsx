import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Trophy, Activity, MessageSquare, Flame } from 'lucide-react';

const Footer = () => {
  const sports = [
    { name: 'MMA', path: '/sport/mma' },
    { name: 'Boxing', path: '/sport/boxing' },
    { name: 'Kickboxing', path: '/sport/kickboxing' },
    { name: 'Brazilian Jiu-Jitsu', path: '/sport/bjj' },
    { name: 'Wrestling', path: '/sport/wrestling' },
  ];

  const quickLinks = [
    { name: 'Pound-for-Pound Rankings', path: '/rankings' },
    { name: 'Famous Fights', path: '/fights' },
    { name: 'Skills & Techniques', path: '/skills' },
    { name: 'Fantasy Matchups', path: '/matchups' },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/60 backdrop-blur-md text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-black text-xl tracking-wider">
            <Shield className="w-6 h-6 text-red-500" />
            <span>VANGUARD<span className="text-red-500">.</span>COMBAT</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            The premier multi-discipline combat intelligence platform tracking elite athletes,
            tactical fight analyses, and live sports data.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live APIs Connected</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-400" /> Combat Sports
          </h4>
          <ul className="space-y-2 text-sm">
            {sports.map((sport) => (
              <li key={sport.path}>
                <Link
                  to={sport.path}
                  className="hover:text-red-400 transition-colors duration-200"
                >
                  {sport.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" /> Intelligence
          </h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-red-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Platform Info
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            Real-time athlete stats aggregated across Octagon, TheSportsDB, and Wikipedia.
          </p>
          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Vanguard Combat. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
