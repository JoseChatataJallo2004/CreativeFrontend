import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = 'http://localhost:5120/api/Detalle'; // ruta de la api
  constructor(private http: HttpClient) { }

  guardarVenta(ventaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ventaData);
  }
  
}
