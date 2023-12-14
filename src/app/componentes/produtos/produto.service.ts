import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'https://fakestoreapi.com/products';

  constructor(
    private http: HttpClient
    ) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  buscarPorId(id: number): Observable<Produto> {
    const url = `${this.API}/${id}`
    return this.http.get<Produto>(url)
  }

}