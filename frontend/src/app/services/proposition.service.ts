import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Proposition, CreatePropositionRequest } from '../models/proposition.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PropositionService {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  private propositionsSubject = new BehaviorSubject<Proposition[]>([]);
  public readonly propositions$ = this.propositionsSubject.asObservable();

  fetchPropositions(): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(`${environment.apiUrl}/api/propositions`).pipe(
      tap({
        next: (propositions) => this.propositionsSubject.next(propositions),
        error: (error) => {
          console.error('Failed to fetch propositions:', error);
          this.toastService.error('Failed to load propositions');
        }
      })
    );
  }

  getPropositionById(id: string): Observable<Proposition> {
    return this.http.get<Proposition>(`${environment.apiUrl}/api/propositions/${id}`).pipe(
      tap({
        error: (error) => {
          console.error('Failed to fetch proposition:', error);
          this.toastService.error('Failed to load proposition details');
        }
      })
    );
  }

  createProposition(proposition: CreatePropositionRequest): Observable<Proposition> {
    return this.http.post<Proposition>(`${environment.apiUrl}/api/propositions`, proposition).pipe(
      tap({
        next: () => {
          this.toastService.success('Proposition submitted successfully!');
          this.fetchPropositions().subscribe();
        },
        error: (error) => {
          console.error('Failed to create proposition:', error);
          this.toastService.error('Failed to submit proposition');
        }
      })
    );
  }

  acceptProposition(id: string): Observable<Proposition> {
    return this.http.put<Proposition>(`${environment.apiUrl}/api/propositions/${id}/accept`, {}).pipe(
      tap({
        next: () => {
          this.toastService.success('Proposition accepted!');
          this.fetchPropositions().subscribe();
        },
        error: (error) => {
          console.error('Failed to accept proposition:', error);
          this.toastService.error('Failed to accept proposition');
        }
      })
    );
  }

  rejectProposition(id: string): Observable<Proposition> {
    return this.http.put<Proposition>(`${environment.apiUrl}/api/propositions/${id}/reject`, {}).pipe(
      tap({
        next: () => {
          this.toastService.success('Proposition rejected');
          this.fetchPropositions().subscribe();
        },
        error: (error) => {
          console.error('Failed to reject proposition:', error);
          this.toastService.error('Failed to reject proposition');
        }
      })
    );
  }

  cancelProposition(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/propositions/${id}`).pipe(
      tap({
        next: () => {
          this.toastService.success('Proposition cancelled');
          this.fetchPropositions().subscribe();
        },
        error: (error) => {
          console.error('Failed to cancel proposition:', error);
          this.toastService.error('Failed to cancel proposition');
        }
      })
    );
  }
}
