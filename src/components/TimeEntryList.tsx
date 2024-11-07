import React from 'react';
import { TimeEntry } from '../types';
import { TimeEntryCard } from './TimeEntryCard';

interface TimeEntryListProps {
  entries: TimeEntry[];
  isLoading: boolean;
}

export const TimeEntryList: React.FC<TimeEntryListProps> = ({ entries, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">No timesheet entries found for this period.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <TimeEntryCard key={entry.cl_time_entry_id} entry={entry} />
      ))}
    </div>
  );
};