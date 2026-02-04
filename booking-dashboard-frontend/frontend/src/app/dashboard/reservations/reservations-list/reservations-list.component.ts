import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { Reservation } from '../../../shared/models/reservation.model';

@Component({
    selector: 'app-reservations-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reservations-list.component.html',
    styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {
    reservations: Reservation[] = [];
    filteredReservations: Reservation[] = [];
    searchTerm: string = '';
    statusFilter: string = 'all';
    isLoading: boolean = true;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.loadReservations();
    }

    loadReservations(): void {
        this.isLoading = true;
        this.dashboardService.getReservations().subscribe({
            next: (reservations) => {
                this.reservations = reservations;
                this.filteredReservations = reservations;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erreur:', error);
                this.reservations = [];
                this.filteredReservations = [];
                this.isLoading = false;
            }
        });
    }

    filterReservations(): void {
        this.filteredReservations = this.reservations.filter(reservation => {
            const matchesSearch = reservation.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                 (reservation.description && reservation.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
            const matchesStatus = this.statusFilter === 'all' || reservation.status === this.statusFilter;
            return matchesSearch && matchesStatus;
        });
    }

    getReservationsByStatus(status: string): Reservation[] {
        return this.filteredReservations.filter(reservation => reservation.status === status);
    }

    clearSearch(): void {
        this.searchTerm = '';
        this.filterReservations();
    }

    clearStatusFilter(): void {
        this.statusFilter = 'all';
        this.filterReservations();
    }

    getStatusText(status: string): string {
        switch(status) {
            case 'confirmed': return 'Confirmée';
            case 'pending': return 'En attente';
            case 'cancelled': return 'Annulée';
            default: return status;
        }
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    calculateDuration(startDate: string, endDate: string): string {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = end.getTime() - start.getTime();
        
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffHours > 0) {
            return `${diffHours} h`;
        }
        return diffMinutes > 0 ? `${diffMinutes} min` : '0 min';
    }

    deleteReservation(id: number): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
            this.dashboardService.deleteReservation(id).subscribe({
                next: () => {
                    this.loadReservations(); // Recharger après suppression
                },
                error: (error) => {
                    console.error('Erreur suppression:', error);
                }
            });
        }
    }
}