import { Menu } from 'lucide-react';

export function TopNav() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-teal-800 text-white shadow-md z-40 h-16 flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">Mahallu Connect</h1>
      <button className="p-2 hover:bg-teal-700 rounded-lg transition">
        <Menu size={24} />
      </button>
    </div>
  );
}
