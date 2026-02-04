import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Reservation } from '../../shared/models/reservation.model';

interface CalendarDay {
  day: number;
  date: Date;
  hasReservations: boolean;
  isToday: boolean;
  isEmpty: boolean;
  reservations: Reservation[];
}

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    currentDate: Date = new Date();
    calendarDays: CalendarDay[] = [];
    reservations: Reservation[] = [];
    isLoading: boolean = true;
    weekdays: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    monthNames: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                           'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.loadReservations();
    }

    loadReservations(): void {
        this.isLoading = true;
        this.dashboardService.getReservations().subscribe({
            next: (reservations) => {
                this.reservations = reservations;
                this.generateCalendar();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erreur:', error);
                this.generateCalendar();
                this.isLoading = false;
            }
        });
    }

    generateCalendar(): void {
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        this.calendarDays = [];

        for (let i = 0; i < startingDay; i++) {
            this.calendarDays.push({
                day: 0,
                date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i - startingDay + 1),
                hasReservations: false,
                isToday: false,
                isEmpty: true,
                reservations: []
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
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
            return startDate === dateStr;
        });
    }

    getTotalReservationsForMonth(): number {
        return this.calendarDays.reduce((total, day) => total + day.reservations.length, 0);
    }

    getConfirmedReservationsCount(): number {
        return this.reservations.filter(r => r.status === 'confirmed').length;
    }

    prevMonth(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.currentDate = new Date(this.currentDate);
        this.generateCalendar();
    }

    nextMonth(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.currentDate = new Date(this.currentDate);
        this.generateCalendar();
    }

    getCurrentMonth(): string {
        return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }

    showDayDetails(day: CalendarDay): void {
        if (!day.isEmpty && day.reservations.length > 0) {
            alert(`${day.reservations.length} réservation(s) pour le ${day.day} ${this.monthNames[this.currentDate.getMonth()]}`);
        }
    }

    getDayClasses(day: CalendarDay): string {
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
        }
        
        return classes;
    }

    getStatusColor(status: string): string {
        switch(status) {
            case 'confirmed': return '#4cc9f0';
            case 'pending': return '#f8961e';
            case 'cancelled': return '#f72585';
            default: return '#4361ee';
        }
    }
}