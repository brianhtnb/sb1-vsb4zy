export interface TimeEntry {
  cl_time_entry_id: string;
  cl_user: string;
  cw_user: string | null;
  status: 'NEW' | 'CREATED' | 'UPDATED' | 'FAILED';
  notes: string | null;
  cw_time_entry_id: number | null;
  dt_start: string;
  dt_end: string | null;
  number_updates: number;
  cw_ticket_id: number | null;
  dt_created: string;
  dt_modified: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}