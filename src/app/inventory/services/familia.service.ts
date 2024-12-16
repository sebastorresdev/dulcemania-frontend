import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Familia } from '../models/familia';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  
  baseUrl : string = `${environment.apiUrl}familias` 

  
  http = inject(HttpClient);
  

  getFamilias() : Observable<Familia[]> {
    return this.http.get<Familia[]>(this.baseUrl);
  }
}
