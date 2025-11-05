import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Download } from 'lucide-react';

interface FinancialEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface YearlyData {
  year: string;
  income: number;
  expense: number;
  donation: number;
}

export function Reports() {
  const [entries, setEntries] = useState<FinancialEntry[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_reports')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setEntries(data || []);
      calculateYearlyData(data || []);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateYearlyData = (data: FinancialEntry[]) => {
    const yearMap: { [key: string]: YearlyData } = {};

    data.forEach(entry => {
      const year = new Date(entry.date).getFullYear().toString();
      if (!yearMap[year]) {
        yearMap[year] = { year, income: 0, expense: 0, donation: 0 };
      }
      yearMap[year][entry.category as keyof Omit<YearlyData, 'year'>] += entry.amount;
    });

    setYearlyData(Object.values(yearMap).sort((a, b) => b.year.localeCompare(a.year)));
  };

  const maxValue = Math.max(
    ...yearlyData.flatMap(d => [d.income, d.expense, d.donation])
  );

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading financial data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Annual Financial Overview</h3>
        <div className="space-y-6">
          {yearlyData.map(data => (
            <div key={data.year}>
              <div className="text-sm font-semibold text-gray-700 mb-2">{data.year}</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Income</span>
                    <span className="font-medium text-green-700">₹{data.income.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all"
                      style={{ width: `${(data.income / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Expense</span>
                    <span className="font-medium text-red-700">₹{data.expense.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-red-500 h-4 rounded-full transition-all"
                      style={{ width: `${(data.expense / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Donation</span>
                    <span className="font-medium text-blue-700">₹{data.donation.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full transition-all"
                      style={{ width: `${(data.donation / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900">Recent Financial Entries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.slice(0, 10).map(entry => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(entry.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{entry.description}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span
                      className={`font-medium ${
                        entry.category === 'income'
                          ? 'text-green-600'
                          : entry.category === 'donation'
                          ? 'text-blue-600'
                          : 'text-red-600'
                      }`}
                    >
                      ₹{entry.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="w-full bg-teal-800 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2">
        <Download size={20} />
        Download PDF Report
      </button>
    </div>
  );
}
