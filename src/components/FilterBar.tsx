import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface FilterBarProps {
  status: string;
  onStatusChange: (status: string) => void;
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

const statuses = [
  { value: '', label: 'All Status' },
  { value: 'NEW', label: 'New' },
  { value: 'CREATED', label: 'Created' },
  { value: 'UPDATED', label: 'Updated' },
  { value: 'FAILED', label: 'Failed' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  status,
  onStatusChange,
  startDate,
  endDate,
  onDateChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              value={format(startDate, 'yyyy-MM-dd')}
              onChange={(e) => onDateChange(new Date(e.target.value), endDate)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="endDate"
              value={format(endDate, 'yyyy-MM-dd')}
              onChange={(e) => onDateChange(startDate, new Date(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};