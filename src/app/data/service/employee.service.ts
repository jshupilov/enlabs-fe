import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../schema/employee';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService) { }

  public getAll(): Observable<Employee[]> {
    return this.apiService.get('/employee/all');
  }

  public add(employee: Employee): Observable<Employee> {
    return this.apiService.post('/employee', employee);
  }

  public update(employee: Employee): Observable<Employee> {
    return this.apiService.put('/employee', employee);
  }

  public remove(id: number): Observable<Boolean> {
    return this.apiService.delete('/employee/' + id);
  }

}
