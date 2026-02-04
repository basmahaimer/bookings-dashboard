import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { CalendarComponent } from '../calendar/calendar.component';
import { ReservationsListComponent } from '../reservations/reservations-list/reservations-list.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { ModalComponent, ModalType } from '../../shared/components/modal/modal.component';
import { CalendarViewComponent } from '../../shared/components/calendar-view/calendar-view.component';
import { DashboardService } from '../dashboard.service';
import { Reservation, ReservationFormData } from '../../shared/models/reservation.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule, 
        CalendarComponent,
        ReservationsListComponent,
        StatisticsComponent,
        ModalComponent,      // Ajouté
        CalendarViewComponent // Ajouté
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    currentUser: User | null = null;
    activeSection: string = 'calendar';

    // Modal state
    modalType: ModalType = 'new-reservation';
    modalData: any = {};
    isModalOpen = false;
    
    // Calendar view state
    isCalendarViewOpen = false;
    calendarViewDate = new Date();
    calendarViewReservations: Reservation[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private dashboardService: DashboardService
    ) {}

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        }

        this.loadReservationsForCalendarView();
    }

    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    // Modal methods
    openNewReservationModal(): void {
        this.openModal('new-reservation');
    }

    openModal(type: ModalType, data?: any): void {
        this.modalType = type;
        this.modalData = data || {};
        this.isModalOpen = true;
    }

    closeModal(): void {
        this.isModalOpen = false;
        this.modalData = {};
    }

    onModalConfirm(data: any): void {
        if (this.modalType === 'new-reservation') {
            this.createReservation(data);
        } else if (this.modalType === 'edit-reservation') {
            this.updateReservation(this.modalData.id, data);
        }
        this.closeModal();
    }

    onModalDelete(id: number): void {
        this.deleteReservation(id);
        this.closeModal();
    }

    // Calendar view methods
    openCalendarView(): void {
        this.isCalendarViewOpen = true;
    }

    closeCalendarView(): void {
        this.isCalendarViewOpen = false;
    }

    onCalendarViewNewReservation(): void {
        this.closeCalendarView();
        this.openNewReservationModal();
    }

    onCalendarViewEditReservation(reservation: Reservation): void {
        this.closeCalendarView();
        this.openModal('edit-reservation', reservation);
    }

    onCalendarViewDeleteReservation(id: number): void {
        this.closeCalendarView();
        this.openModal('confirm-delete', { id });
    }

    // Reservation CRUD operations
    createReservation(data: ReservationFormData): void {
        this.dashboardService.createReservation(data).subscribe({
            next: () => {
                alert('Réservation créée avec succès!');
                this.refreshComponents();
            },
            error: (error) => {
                console.error('Erreur création:', error);
                alert('Erreur lors de la création de la réservation');
            }
        });
    }

    updateReservation(id: number, data: ReservationFormData): void {
        this.dashboardService.updateReservation(id, data).subscribe({
            next: () => {
                alert('Réservation mise à jour avec succès!');
                this.refreshComponents();
            },
            error: (error) => {
                console.error('Erreur mise à jour:', error);
                alert('Erreur lors de la mise à jour de la réservation');
            }
        });
    }

    deleteReservation(id: number): void {
        this.dashboardService.deleteReservation(id).subscribe({
            next: () => {
                alert('Réservation supprimée avec succès!');
                this.refreshComponents();
            },
            error: (error) => {
                console.error('Erreur suppression:', error);
                alert('Erreur lors de la suppression de la réservation');
            }
        });
    }

    // Load reservations for calendar view
    loadReservationsForCalendarView(): void {
        this.dashboardService.getReservations().subscribe({
            next: (reservations) => {
                this.calendarViewReservations = reservations;
            },
            error: (error) => {
                console.error('Erreur chargement réservations:', error);
                this.calendarViewReservations = [];
            }
        });
    }

    // Refresh components after CRUD operations
    refreshComponents(): void {
        this.loadReservationsForCalendarView();
    }
}