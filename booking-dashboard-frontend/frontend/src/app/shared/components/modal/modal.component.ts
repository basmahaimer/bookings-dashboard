import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reservation, ReservationFormData } from '../../models/reservation.model';

export type ModalType = 'new-reservation' | 'edit-reservation' | 'view-reservation' | 'confirm-delete' | 'calendar-view';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() type: ModalType = 'view-reservation';
  @Input() data: any = {};
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  // Renommé pour éviter le conflit avec le formulaire
  reservationFormData: ReservationFormData = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'pending'
  };

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['type']) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    if (this.type === 'edit-reservation' && this.data) {
      this.reservationFormData = {
        title: this.data.title || '',
        description: this.data.description || '',
        start_date: this.formatDateTime(this.data.start_date),
        end_date: this.formatDateTime(this.data.end_date),
        status: this.data.status || 'pending'
      };
    } else if (this.type === 'new-reservation') {
      const now = new Date();
      const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
      
      this.reservationFormData = {
        title: '',
        description: '',
        start_date: this.formatDateTime(now.toISOString()),
        end_date: this.formatDateTime(inOneHour.toISOString()),
        status: 'pending'
      };
    }
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

  getStatusText(status: string): string {
    switch(status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.type === 'new-reservation' || this.type === 'edit-reservation') {
      this.confirm.emit(this.reservationFormData);
    } else if (this.type === 'confirm-delete') {
      this.delete.emit(this.data.id);
    }
  }

  getTitle(): string {
    switch(this.type) {
      case 'new-reservation': return 'Nouvelle Réservation';
      case 'edit-reservation': return 'Modifier Réservation';
      case 'view-reservation': return 'Détails Réservation';
      case 'confirm-delete': return 'Confirmation';
      case 'calendar-view': return 'Vue Calendrier';
      default: return 'Modal';
    }
  }

  getIcon(): string {
    switch(this.type) {
      case 'new-reservation': return 'fas fa-plus-circle';
      case 'edit-reservation': return 'fas fa-edit';
      case 'view-reservation': return 'fas fa-eye';
      case 'confirm-delete': return 'fas fa-exclamation-triangle';
      case 'calendar-view': return 'fas fa-calendar-alt';
      default: return 'fas fa-info-circle';
    }
  }
}