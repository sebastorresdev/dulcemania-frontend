import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.apiUrl}pedidos`;
  private _htpp = inject(HttpClient);
  
  constructor() { }

  getOrders() : Observable<Pedido[]> {
    return this._htpp.get<Pedido[]>(this.baseUrl);
  }
}
