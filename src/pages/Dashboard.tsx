import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { timesheetApi, TimeEntry } from '../services/api';
import { ViewSelector } from '../components/ViewSelector';
import { DateNavigator } from '../components/DateNavigator';
import { TimeEntryList } from '../components/TimeEntryList';
import { Pagination } from '../components/Pagination';
import { FilterBar } from '../components/FilterBar';
import { addDays, startOfDay, startOfWeek, startOfMonth, endOfDay, endOfWeek, endOfMonth } from 'date-fns';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [timesheets, setTimesheets] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState(() => {
    const start = startOfDay(currentDate);
    const end = endOfDay(currentDate);
    return { start, end };
  });

  const updateDateRange = (view: 'day' | 'week' | 'month', date: Date) => {
    const start = view === 'day' ? startOfDay(date) :
                 view === 'week' ? startOfWeek(date) :
                 startOfMonth(date);
    
    const end = view === 'day' ? endOfDay(date) :
               view === 'week' ? endOfWeek(date) :
               endOfMonth(date);

    setDateRange({ start, end });
  };

  useEffect(() => {
    updateDateRange(currentView, currentDate);
  }, [currentView, currentDate]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        setIsLoading(true);
        const response = await timesheetApi.getTimesheets({
          status: status || undefined,
          start_date: dateRange.start.toISOString(),
          end_date: dateRange.end.toISOString(),
          page: currentPage,
          order_by: 'dt_created desc'
        });
        setTimesheets(response.results);
        setTotalPages(Math.ceil(response.count / 10));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load timesheets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeEntries();
  }, [currentPage, status, dateRange]);

  const handleViewChange = (view: 'day' | 'week' | 'month') => {
    setCurrentView(view);
    setCurrentPage(1);
    updateDateRange(view, currentDate);
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const days = currentView === 'day' ? 1 :
                currentView === 'week' ? 7 :
                30;
    const newDate = addDays(currentDate, direction === 'prev' ? -days : days);
    setCurrentDate(newDate);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Timesheet Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ViewSelector
                currentView={currentView}
                onViewChange={handleViewChange}
              />
              <button
                onClick={logout}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <DateNavigator
            currentDate={currentDate}
            onPrevious={() => handleDateChange('prev')}
            onNext={() => handleDateChange('next')}
            view={currentView}
          />
        </div>

        <FilterBar
          status={status}
          onStatusChange={setStatus}
          startDate={dateRange.start}
          endDate={dateRange.end}
          onDateChange={handleDateRangeChange}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <TimeEntryList
          entries={timesheets}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default Dashboard;