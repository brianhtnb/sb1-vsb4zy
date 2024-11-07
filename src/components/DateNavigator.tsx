import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateNavigatorProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  view: 'day' | 'week' | 'month';
}

export const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onPrevious,
  onNext,
  view,
}) => {
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
    
    if (view === 'day') {
      options.day = 'numeric';
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPrevious}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-xl font-semibold text-gray-800">
        {formatDate()}
      </h2>
      
      <button
        onClick={onNext}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};