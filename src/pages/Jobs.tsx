import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, DollarSign, MessageCircle } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  country: string;
  salary: string;
  contact: string;
  description: string;
  posted_date: string;
  status: string;
}

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('posted_date', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (contact: string) => {
    const cleanContact = contact.replace(/\s+/g, '');
    window.open(`https://wa.me/${cleanContact}`, '_blank');
  };

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading job opportunities...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Jobs & Opportunities</h2>
        <div className="text-sm text-gray-600">{jobs.length} active jobs</div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No job opportunities available at the moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{job.location}, {job.country}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-teal-800 font-bold">
                  <DollarSign size={18} />
                  <span>{job.salary}</span>
                </div>
              </div>

              {job.description && (
                <p className="text-sm text-gray-700 mb-4">{job.description}</p>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-xs text-gray-500">
                  Posted {new Date(job.posted_date).toLocaleDateString('en-IN')}
                </div>
                <button
                  onClick={() => openWhatsApp(job.contact)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  <MessageCircle size={18} />
                  Contact via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-center">
        <h3 className="font-bold text-teal-900 mb-2">Have a Job Opportunity?</h3>
        <p className="text-sm text-teal-800 mb-4">
          Contact the Mahallu office to post job opportunities for community members
        </p>
        <button className="bg-teal-800 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition">
          Post New Job (Admin)
        </button>
      </div>
    </div>
  );
}
