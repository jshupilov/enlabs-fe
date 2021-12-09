import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  public get(url: string, options = {}): Observable<any> {
    return this.http.get(API_URL + url, Object.assign({}, { headers: this.headers }, options)).pipe(
      catchError(this.handleError)
    );
  }
  public post(url: string, data: any, options = {}): Observable<any> {
    return this.http.post(API_URL + url, data, Object.assign({}, options)).pipe(
      catchError(this.handleError)
    );;
  }
  public put(url: string, data: any, options = {}): Observable<any> {
    return this.http.put(API_URL + url, data, Object.assign({}, { headers: this.headers }, options)).pipe(
      catchError(this.handleError)
    );
  }
  public delete(url: string, options = {}): Observable<any> {
    return this.http.delete(API_URL + url, Object.assign({}, { headers: this.headers }, options)).pipe(
      catchError(this.handleError)
    );
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    return throwError({
      error: true,
      message: error
    });
  }
}
