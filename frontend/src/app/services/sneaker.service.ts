import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Sneaker, CreateSneakerRequest } from '../models/sneaker.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class SneakerService {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  private sneakersSubject = new BehaviorSubject<Sneaker[]>([]);
  public readonly sneakers$ = this.sneakersSubject.asObservable();

  fetchSneakers(): Observable<Sneaker[]> {
    return this.http.get<Sneaker[]>(`${environment.apiUrl}/api/sneakers`).pipe(
      tap({
        next: (sneakers) => this.sneakersSubject.next(sneakers),
        error: (error) => {
          console.error('Failed to fetch sneakers:', error);
          this.toastService.error('Failed to load sneakers');
        }
      })
    );
  }

  getSneakerById(id: string): Observable<Sneaker> {
    return this.http.get<Sneaker>(`${environment.apiUrl}/api/sneakers/${id}`).pipe(
      tap({
        error: (error) => {
          console.error('Failed to fetch sneaker:', error);
          this.toastService.error('Failed to load sneaker details');
        }
      })
    );
  }

  createSneaker(sneaker: CreateSneakerRequest): Observable<Sneaker> {
    return this.http.post<Sneaker>(`${environment.apiUrl}/api/sneakers`, sneaker).pipe(
      tap({
        next: () => {
          this.toastService.success('Sneaker added successfully!');
          this.fetchSneakers().subscribe();
        },
        error: (error) => {
          console.error('Failed to create sneaker:', error);
          this.toastService.error('Failed to add sneaker');
        }
      })
    );
  }

  updateSneaker(id: string, sneaker: Partial<CreateSneakerRequest>): Observable<Sneaker> {
    return this.http.put<Sneaker>(`${environment.apiUrl}/api/sneakers/${id}`, sneaker).pipe(
      tap({
        next: () => {
          this.toastService.success('Sneaker updated successfully!');
          this.fetchSneakers().subscribe();
        },
        error: (error) => {
          console.error('Failed to update sneaker:', error);
          this.toastService.error('Failed to update sneaker');
        }
      })
    );
  }

  deleteSneaker(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/sneakers/${id}`).pipe(
      tap({
        next: () => {
          this.toastService.success('Sneaker deleted successfully!');
          this.fetchSneakers().subscribe();
        },
        error: (error) => {
          console.error('Failed to delete sneaker:', error);
          this.toastService.error('Failed to delete sneaker');
        }
      })
    );
  }
}
