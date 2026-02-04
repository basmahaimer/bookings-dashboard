export interface Reservation {
  id?: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface ReservationFormData {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: string;
}