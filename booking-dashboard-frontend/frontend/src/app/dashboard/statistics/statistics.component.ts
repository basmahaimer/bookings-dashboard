import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { Stats } from '../../shared/models/stats.model';

@Component({
    selector: 'app-statistics',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    stats: Stats[] = [];
    isLoading: boolean = true;
    totalStats = {
        hours: 51.0,
        reservations: 3,
        avgDuration: 17.0,
        busyDay: '03/02/2026',
        busyDayCount: 2
    };

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        this.isLoading = true;
        this.dashboardService.getStats().subscribe({
            next: (stats) => {
                this.stats = stats;
                this.calculateTotals();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erreur:', error);
                this.stats = [];
                this.calculateTotals();
                this.isLoading = false;
            }
        });
    }

    calculateTotals(): void {
        // Utiliser les données mock si pas de stats
        if (this.stats.length === 0) {
            this.totalStats = {
                hours: 51.0,
                reservations: 3,
                avgDuration: 17.0,
                busyDay: '03/02/2026',
                busyDayCount: 2
            };
        }
    }

    getMostBusyDay(): string {
        return this.totalStats.busyDay;
    }

    getMostBusyDayCount(): number {
        return this.totalStats.busyDayCount;
    }

    formatMonth(monthStr: string): string {
        if (!monthStr) return 'Inconnu';
        
        if (monthStr.includes('-')) {
            const monthNum = parseInt(monthStr.split('-')[1]);
            const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                              'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            return monthNames[monthNum - 1] || 'Inconnu';
        }
        return monthStr;
    }

    getMonthYear(monthStr: string): string {
        if (!monthStr) return 'Inconnu';
        
        if (monthStr.includes('-')) {
            return monthStr.split('-')[0];
        }
        return new Date().getFullYear().toString();
    }

    getBestMonth(): string {
        if (this.stats.length === 0) return 'Aucun';
        
        let bestMonth = this.stats[0];
        this.stats.forEach(month => {
            if ((month.total_reservations || 0) > (bestMonth.total_reservations || 0)) {
                bestMonth = month;
            }
        });
        
        const monthName = this.formatMonth(bestMonth.month);
        const count = bestMonth.total_reservations || 0;
        return `${monthName} avec ${count} réservation${count > 1 ? 's' : ''}`;
    }

    getGrowthPercentage(): number {
        return 12;
    }
}