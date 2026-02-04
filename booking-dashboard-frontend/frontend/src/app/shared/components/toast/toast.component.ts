import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    callback: () => void;
  };
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('out => in', [
        animate('300ms ease-out')
      ]),
      transition('in => out', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() config: ToastConfig = {
    message: '',
    type: 'info',
    duration: 5000
  };
  
  @Output() closed = new EventEmitter<void>(); // Changé de 'close' à 'closed'
  
  isVisible = false;
  private timeoutId: any;

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    setTimeout(() => {
      this.isVisible = true;
      if (this.config.duration && this.config.duration > 0) {
        this.timeoutId = setTimeout(() => {
          this.hide();
        }, this.config.duration);
      }
    }, 100);
  }

  hide(): void {
    this.isVisible = false;
    setTimeout(() => {
      this.closed.emit();
    }, 300);
  }

  getIcon(): string {
    switch(this.config.type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-info-circle';
    }
  }

  getTitle(): string {
    switch(this.config.type) {
      case 'success': return 'Succès';
      case 'error': return 'Erreur';
      case 'warning': return 'Attention';
      case 'info': return 'Information';
      default: return 'Notification';
    }
  }

  onAction(): void {
    if (this.config.action && this.config.action.callback) {
      this.config.action.callback();
      this.hide();
    }
  }

  onClose(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.hide();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}