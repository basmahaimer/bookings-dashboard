import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Reservation, ReservationFormData } from '../shared/models/reservation.model';
import { Stats } from '../shared/models/stats.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = 'http://localhost:3000/api';
    private useMockData = true; // Mettre à false quand l'API est prête

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    getReservations(): Observable<Reservation[]> {
        if (this.useMockData) {
            return of(this.getMockReservations()).pipe(delay(500));
        }

        return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`, {
            headers: this.getHeaders()
        }).pipe(
            catchError(error => {
                console.error('Erreur API réservations:', error);
                return of(this.getMockReservations()).pipe(delay(500));
            })
        );
    }

    createReservation(reservation: ReservationFormData): Observable<Reservation> {
        if (this.useMockData) {
            const newReservation: Reservation = {
                ...reservation,
                id: Math.floor(Math.random() * 1000) + 100,
                status: reservation.status as 'confirmed' | 'pending' | 'cancelled'
            };
            return of(newReservation).pipe(delay(500));
        }

        return this.http.post<Reservation>(`${this.apiUrl}/reservations`, reservation, {
            headers: this.getHeaders()
        });
    }

    updateReservation(id: number, reservation: ReservationFormData): Observable<any> {
        if (this.useMockData) {
            return of({ success: true }).pipe(delay(500));
        }

        return this.http.put(`${this.apiUrl}/reservations/${id}`, reservation, {
            headers: this.getHeaders()
        });
    }

    deleteReservation(id: number): Observable<any> {
        if (this.useMockData) {
            return of({ success: true }).pipe(delay(500));
        }

        return this.http.delete(`${this.apiUrl}/reservations/${id}`, {
            headers: this.getHeaders()
        });
    }

    getStats(): Observable<Stats[]> {
        if (this.useMockData) {
            return of(this.getMockStats()).pipe(delay(500));
        }

        return this.http.get<Stats[]>(`${this.apiUrl}/stats`, {
            headers: this.getHeaders()
        }).pipe(
            catchError(error => {
                console.error('Erreur API stats:', error);
                return of(this.getMockStats()).pipe(delay(500));
            })
        );
    }

    private getMockReservations(): Reservation[] {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        return [
            {
                id: 1,
                title: 'test 2',
                description: '?GY',
                start_date: new Date(2026, 1, 6, 18, 9).toISOString(),
                end_date: new Date(2026, 1, 7, 19, 9).toISOString(),
                status: 'confirmed'
            },
            {
                id: 2,
                title: 'test',
                description: 'zadbIMHDNiu:',
                start_date: new Date(2026, 1, 4, 18, 8).toISOString(),
                end_date: new Date(2026, 1, 5, 19, 8).toISOString(),
                status: 'pending'
            },
            {
                id: 3,
                title: 'Réunion équipe',
                description: 'Réunion hebdomadaire',
                start_date: today.toISOString(),
                end_date: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString(),
                status: 'confirmed'
            },
            {
                id: 4,
                title: 'Présentation client',
                description: 'Présentation du nouveau produit',
                start_date: tomorrow.toISOString(),
                end_date: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000).toISOString(),
                status: 'pending'
            }
        ];
    }

    private getMockStats(): Stats[] {
        return [
            {
                month: '2026-02',
                total_hours: 51.0,
                total_reservations: 3,
                avg_duration: 17.0
            },
            {
                month: '2026-01',
                total_hours: 42.5,
                total_reservations: 5,
                avg_duration: 8.5
            },
            {
                month: '2025-12',
                total_hours: 38.0,
                total_reservations: 4,
                avg_duration: 9.5
            }
        ];
    }
}