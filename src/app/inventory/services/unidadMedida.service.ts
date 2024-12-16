import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadMedida } from '../models/UnidadMedida';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  baseUrl : string = `${environment.apiUrl}medidas` 

  http = inject(HttpClient);
  

  getUnidades() : Observable<UnidadMedida[]> {
    return this.http.get<UnidadMedida[]>(this.baseUrl);
  }
}
