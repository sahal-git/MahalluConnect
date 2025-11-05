import { useNavigate } from 'react-router-dom';
import { BarChart3, PieChart, Briefcase, Calendar } from 'lucide-react';

const cards = [
  {
    title: 'Financial Reports',
    icon: BarChart3,
    link: '/reports',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  {
    title: 'Survey Insights',
    icon: PieChart,
    link: '/survey',
    color: 'bg-green-100',
    textColor: 'text-green-800',
  },
  {
    title: 'Jobs & Opportunities',
    icon: Briefcase,
    link: '/jobs',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
  },
  {
    title: 'Announcements & Events',
    icon: Calendar,
    link: '/events',
    color: 'bg-red-100',
    textColor: 'text-red-800',
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Mahallu Connect</h2>
        <p className="text-gray-600 mt-1">Community management platform for Kerala Mahallu</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              onClick={() => navigate(card.link)}
              className={`${card.color} ${card.textColor} p-6 rounded-lg shadow-md hover:shadow-lg transition text-left`}
            >
              <Icon size={32} className="mb-3" />
              <h3 className="font-bold text-sm">{card.title}</h3>
            </button>
          );
        })}
      </div>
    </div>
  );
}
