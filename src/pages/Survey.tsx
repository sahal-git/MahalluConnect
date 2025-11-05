import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SurveyData {
  id: string;
  total_households: number;
  unemployed_percentage: number;
  poverty_percentage: number;
  average_income: number;
  education_distribution: {
    [key: string]: number;
  };
  zone: string;
}

export function Survey() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [allZones, setAllZones] = useState<string[]>([]);
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveyData();
  }, []);

  useEffect(() => {
    if (allZones.length > 0) {
      fetchZoneData(selectedZone);
    }
  }, [selectedZone]);

  const fetchSurveyData = async () => {
    try {
      const { data, error } = await supabase
        .from('survey_data')
        .select('*')
        .order('zone');

      if (error) throw error;

      const zones = data?.map(d => d.zone) || [];
      setAllZones(zones);

      const allZonesData = data?.find(d => d.zone === 'All Zones');
      if (allZonesData) {
        setSurveyData(allZonesData);
      }
    } catch (error) {
      console.error('Error fetching survey data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchZoneData = async (zone: string) => {
    try {
      const { data, error } = await supabase
        .from('survey_data')
        .select('*')
        .eq('zone', zone)
        .maybeSingle();

      if (error) throw error;
      if (data) setSurveyData(data);
    } catch (error) {
      console.error('Error fetching zone data:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading survey data...</div>
        </div>
      </div>
    );
  }

  if (!surveyData) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="text-center text-gray-500">No survey data available</div>
      </div>
    );
  }

  const educationData = Object.entries(surveyData.education_distribution);
  const totalEducation = educationData.reduce((sum, [, value]) => sum + value, 0);

  const colors = [
    { bg: 'bg-blue-500', text: 'text-blue-700', light: 'bg-blue-100' },
    { bg: 'bg-green-500', text: 'text-green-700', light: 'bg-green-100' },
    { bg: 'bg-yellow-500', text: 'text-yellow-700', light: 'bg-yellow-100' },
    { bg: 'bg-red-500', text: 'text-red-700', light: 'bg-red-100' },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Survey Insights</h2>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {allZones.map(zone => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-teal-800">{surveyData.total_households}</div>
          <div className="text-sm text-gray-600 mt-1">Total Households</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-red-600">{surveyData.unemployed_percentage}%</div>
          <div className="text-sm text-gray-600 mt-1">Unemployed Youth</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-orange-600">{surveyData.poverty_percentage}%</div>
          <div className="text-sm text-gray-600 mt-1">Below Poverty Line</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-green-600">₹{surveyData.average_income.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Average Income</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Education Distribution</h3>
        <div className="space-y-4">
          {educationData.map(([level, count], index) => {
            const percentage = (count / totalEducation) * 100;
            const colorScheme = colors[index % colors.length];

            return (
              <div key={level}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{level}</span>
                  <span className={`text-sm font-semibold ${colorScheme.text}`}>
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${colorScheme.bg} h-3 rounded-full transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Visual Breakdown</h3>
        <div className="flex h-8 rounded-lg overflow-hidden">
          {educationData.map(([level, count], index) => {
            const percentage = (count / totalEducation) * 100;
            const colorScheme = colors[index % colors.length];

            return (
              <div
                key={level}
                className={colorScheme.bg}
                style={{ width: `${percentage}%` }}
                title={`${level}: ${percentage.toFixed(1)}%`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {educationData.map(([level], index) => {
            const colorScheme = colors[index % colors.length];
            return (
              <div key={level} className="flex items-center gap-2">
                <div className={`w-4 h-4 ${colorScheme.bg} rounded`} />
                <span className="text-xs text-gray-600">{level}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
