import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadUserFromStorage();
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
            .pipe(
                tap(response => {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    this.currentUserSubject.next(response.user);
                })
            );
    }

    register(email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    private loadUserFromStorage(): void {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            this.currentUserSubject.next(JSON.parse(userStr));
        }
    }
}