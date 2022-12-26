import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/env/env';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = env.apiUrl
  
  constructor(private readonly http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/all`)
  }

  public getEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/find/${id}`)
  }
  
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/add`, employee)
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/update`, employee)
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/delete/${id}`)
  }

}
