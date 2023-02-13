import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
      const user = response;
      console.log(user)
      if(user){
        localStorage.setItem('user', JSON.stringify(user))  /// saving for local storage for maintain the session
        //this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrenUser(user: User){
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user')
  }


}
