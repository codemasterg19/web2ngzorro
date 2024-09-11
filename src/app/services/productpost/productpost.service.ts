import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

 export interface   Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductpostService {

  private url: string = "http://localhost:8080/api/productos";

  constructor(private http: HttpClient) { }

  getProductos() : Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  
  }

  createProducto(producto: Producto): Observable<Producto>{
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<Producto>(this.url, producto, {headers});
  }
  
updateProducto(producto: Producto): Observable<Producto>{
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.put<Producto>(`${this.url}/${producto.id}`, producto, {headers});
  }

  deleteProducto(id: string): Observable<void>{ 
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
