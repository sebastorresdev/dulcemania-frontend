import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    baseUrl : string = `${environment.apiUrl}productos` 
    
    urlUpload = 'http://localhost:8070/api/productos/uploadImage';
    http = inject(HttpClient);

    constructor() { }

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

  saveProduct(product : Product) : Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(product: Product) : Observable<Product>{
    return this.http.put<Product>(this.baseUrl, product);
  }

  deleteProduct(id: number) : Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`)
  }

  customUpload(file:any) : Observable<string> {
    return this.http.post<string>(this.urlUpload, file);
  }
}
