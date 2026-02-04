import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
        this.errorMessage = '';
    }

    onSubmit(): void {
        if (!this.email || !this.password) {
            this.errorMessage = 'Veuillez remplir tous les champs';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        if (this.isLoginMode) {
            this.authService.login(this.email, this.password).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.errorMessage = error.error?.error || 'Erreur de connexion';
                    this.isLoading = false;
                }
            });
        } else {
            this.authService.register(this.email, this.password).subscribe({
                next: () => {
                    this.errorMessage = 'Compte créé! Connectez-vous';
                    this.isLoginMode = true;
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = error.error?.error || "Erreur d'inscription";
                    this.isLoading = false;
                }
            });
        }
    }
}