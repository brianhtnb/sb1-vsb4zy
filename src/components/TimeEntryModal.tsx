import React from 'react';
import { X, ExternalLink, User, Clock, Calendar, RefreshCw, Hash } from 'lucide-react';
import { TimeEntry } from '../types';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

interface TimeEntryModalProps {
  entry: TimeEntry;
  onClose: () => void;
}

export const TimeEntryModal: React.FC<TimeEntryModalProps> = ({ entry, onClose }) => {
  const formatDateTime = (dateStr: string) => {
    return format(parseISO(dateStr), 'PPpp');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Time Entry Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Time Information
              </h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-gray-500">Start Time:</span> {formatDateTime(entry.dt_start)}</p>
                {entry.dt_end && (
                  <p><span className="text-gray-500">End Time:</span> {formatDateTime(entry.dt_end)}</p>
                )}
                <p><span className="text-gray-500">Created:</span> {formatDateTime(entry.dt_created)}</p>
                <p><span className="text-gray-500">Last Modified:</span> {formatDateTime(entry.dt_modified)}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <User className="w-4 h-4 mr-2" />
                User Information
              </h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-gray-500">Clockify User:</span> {entry.cl_user}</p>
                {entry.cw_user && (
                  <p><span className="text-gray-500">ConnectWise User:</span> {entry.cw_user}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Reference Information
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-500">Clockify Entry:</span>{' '}
                <a
                  href={`https://app.clockify.me/timesheet?entry=${entry.cl_time_entry_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  {entry.cl_time_entry_id}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </p>
              {entry.cw_time_entry_id && (
                <p>
                  <span className="text-gray-500">ConnectWise Entry:</span>{' '}
                  <a
                    href={`https://na.myconnectwise.net/v4_6_release/services/system_io/router/openrecord.rails?recordType=TimeEntry&recid=${entry.cw_time_entry_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    {entry.cw_time_entry_id}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              )}
              {entry.cw_ticket_id && (
                <p>
                  <span className="text-gray-500">Ticket:</span>{' '}
                  <a
                    href={`https://na.myconnectwise.net/v4_6_release/services/system_io/router/openrecord.rails?recordType=ServiceFv&recid=${entry.cw_ticket_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    #{entry.cw_ticket_id}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              )}
            </div>
          </div>

          {entry.notes && (
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Notes</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{entry.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};