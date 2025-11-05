import { Home, BarChart3, PieChart, Briefcase, Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

type TabType = 'home' | 'reports' | 'survey' | 'jobs' | 'events';

const tabs = [
  { id: 'home' as TabType, label: 'Home', icon: Home, path: '/' },
  { id: 'reports' as TabType, label: 'Reports', icon: BarChart3, path: '/reports' },
  { id: 'survey' as TabType, label: 'Survey', icon: PieChart, path: '/survey' },
  { id: 'jobs' as TabType, label: 'Jobs', icon: Briefcase, path: '/jobs' },
  { id: 'events' as TabType, label: 'Events', icon: Calendar, path: '/events' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around h-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center w-full h-full transition ${
                active
                  ? 'text-teal-800 bg-yellow-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
