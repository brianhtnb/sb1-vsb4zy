import React from 'react';
import { Calendar, Clock, CalendarDays } from 'lucide-react';

interface ViewSelectorProps {
  currentView: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'day', label: 'Day', icon: Clock },
    { id: 'week', label: 'Week', icon: CalendarDays },
    { id: 'month', label: 'Month', icon: Calendar },
  ] as const;

  return (
    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`
            flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentView === id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
};