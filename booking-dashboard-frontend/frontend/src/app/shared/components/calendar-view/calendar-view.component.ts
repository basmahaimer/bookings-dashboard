import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../models/reservation.model'; // Chemin corrigé

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() reservations: Reservation[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() newReservation = new EventEmitter<void>();
  @Output() editReservation = new EventEmitter<Reservation>();
  @Output() deleteReservation = new EventEmitter<number>();

  weekdays: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  monthNames: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                         'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  calendarDays: any[] = [];
  selectedDay: any = null;

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    this.calendarDays = [];

    // Jours vides du début
    for (let i = 0; i < startingDay; i++) {
      this.calendarDays.push({
        day: 0,
        date: new Date(this.date.getFullYear(), this.date.getMonth(), i - startingDay + 1),
        isEmpty: true,
        reservations: []
      });
    }

    // Jours du mois
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.date.getFullYear(), this.date.getMonth(), day);
      const dayReservations = this.getReservationsForDay(date);
      
      this.calendarDays.push({
        day: day,
        date: date,
        hasReservations: dayReservations.length > 0,
        isToday: date.toDateString() === today.toDateString(),
        isEmpty: false,
        reservations: dayReservations
      });
    }
  }

  getReservationsForDay(date: Date): Reservation[] {
    const dateStr = date.toISOString().split('T')[0];
    
    return this.reservations.filter(reservation => {
      const startDate = new Date(reservation.start_date).toISOString().split('T')[0];
      const endDate = new Date(reservation.end_date).toISOString().split('T')[0];
      
      return startDate === dateStr || endDate === dateStr ||
             (new Date(reservation.start_date) <= date && new Date(reservation.end_date) >= date);
    });
  }

  selectDay(day: any): void {
    if (!day.isEmpty) {
      this.selectedDay = day;
    }
  }

  getCurrentMonth(): string {
    return `${this.monthNames[this.date.getMonth()]} ${this.date.getFullYear()}`;
  }

  prevMonth(): void {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    this.generateCalendar();
    this.selectedDay = null;
  }

  nextMonth(): void {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
    this.generateCalendar();
    this.selectedDay = null;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes > 0 ? diffMinutes + 'min' : ''}`;
    }
    return `${diffMinutes}min`;
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onNewReservation(): void {
    this.newReservation.emit();
  }

  onEditReservation(reservation: Reservation): void {
    this.editReservation.emit(reservation);
  }

  onDeleteReservation(id: number): void {
    this.deleteReservation.emit(id);
  }

  getDayClasses(day: any): string {
    let classes = 'calendar-day';
    
    if (day.isEmpty) {
      classes += ' empty';
    } else {
      if (day.hasReservations) {
        classes += ' has-reservations';
      }
      if (day.isToday) {
        classes += ' today';
      }
      if (this.selectedDay && this.selectedDay.day === day.day) {
        classes += ' selected';
      }
    }
    
    return classes;
  }
}