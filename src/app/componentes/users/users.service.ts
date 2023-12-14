import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  registrarUser(user: User): Observable<User> {
    return this.http.post<User>(this.API, user)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API)
  }

  buscarPorId(id: number): Observable<User> {
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }
  
  addToBag(user: User, productId: number): Observable<User> {
    const url = `${this.API}/${user.id}`

    if (user.bag.products[productId]) {
      user.bag.products[productId]++;
    } 
    else {
      user.bag.products[productId] = 1;
    }
    
    return this.http.put<User>(url, user)
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.API}/${user.id}`;
    return this.http.put<User>(url, user)
  }

}