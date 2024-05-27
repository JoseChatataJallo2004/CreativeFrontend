import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:5120/api/Cliente/BuscarClienteDNI/';

  constructor(private http: HttpClient) { }
  buscarClientePorDNI(dni: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + dni);
  }
}
