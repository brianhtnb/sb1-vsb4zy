import React, { useState } from 'react';
import { Clock, Ticket, AlertCircle, RefreshCw, User } from 'lucide-react';
import { TimeEntry } from '../types';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { TimeEntryModal } from './TimeEntryModal';

interface TimeEntryCardProps {
  entry: TimeEntry;
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  CREATED: 'bg-green-100 text-green-800',
  UPDATED: 'bg-yellow-100 text-yellow-800',
  FAILED: 'bg-red-100 text-red-800',
};

export const TimeEntryCard: React.FC<TimeEntryCardProps> = ({ entry }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const startTime = parseISO(entry.dt_start);
  const endTime = entry.dt_end ? parseISO(entry.dt_end) : null;
  const lastModified = parseISO(entry.dt_modified);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium">
              {format(startTime, 'h:mm a')}
              {endTime && ` - ${format(endTime, 'h:mm a')}`}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[entry.status]}`}>
            {entry.status}
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{entry.cl_user}</span>
        </div>

        {entry.notes && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{entry.notes}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center space-x-2">
            <Ticket className="w-4 h-4" />
            <span>{entry.cw_ticket_id ? `#${entry.cw_ticket_id}` : 'No ticket'}</span>
          </div>
          
          {entry.status === 'FAILED' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Sync failed</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-xs text-gray-400 mt-2">
          <RefreshCw className="w-3 h-3 mr-1" />
          <span>Last synced {formatDistanceToNow(lastModified, { addSuffix: true })}</span>
        </div>
      </div>

      {isModalOpen && (
        <TimeEntryModal
          entry={entry}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};