import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, MapPin, Bell, Heart } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  type: 'event' | 'notice' | 'obituary';
  description: string;
  date: string;
  location: string;
  created_at: string;
}

export function Events() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar size={20} className="text-blue-600" />;
      case 'notice':
        return <Bell size={20} className="text-yellow-600" />;
      case 'obituary':
        return <Heart size={20} className="text-gray-600" />;
      default:
        return <Bell size={20} />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      event: 'bg-blue-100 text-blue-800',
      notice: 'bg-yellow-100 text-yellow-800',
      obituary: 'bg-gray-100 text-gray-800',
    };
    return badges[type as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const filteredAnnouncements = filter === 'all'
    ? announcements
    : announcements.filter(a => a.type === filter);

  const upcomingEvents = announcements
    .filter(a => a.type === 'event' && new Date(a.date) >= new Date())
    .slice(0, 3);

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading announcements...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Announcements & Events</h2>

      {upcomingEvents.length > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h3 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
            <Calendar size={20} />
            Upcoming Events
          </h3>
          <div className="space-y-2">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-teal-900 font-medium">{event.title}</span>
                <span className="text-teal-700">
                  {new Date(event.date).toLocaleDateString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
            filter === 'all'
              ? 'bg-teal-800 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('event')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
            filter === 'event'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setFilter('notice')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
            filter === 'notice'
              ? 'bg-yellow-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Notices
        </button>
        <button
          onClick={() => setFilter('obituary')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
            filter === 'obituary'
              ? 'bg-gray-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Obituaries
        </button>
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No announcements found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map(announcement => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getTypeIcon(announcement.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {announcement.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
                        announcement.type
                      )}`}
                    >
                      {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{announcement.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(announcement.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    {announcement.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{announcement.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
