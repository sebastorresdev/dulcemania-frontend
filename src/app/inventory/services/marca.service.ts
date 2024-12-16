import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  baseUrl = `${environment.apiUrl}marcas` 

  http = inject(HttpClient);
  

  getMarcas() : Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseUrl);
  }
}
