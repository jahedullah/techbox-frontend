// import { Injectable, ɵisEnvironmentProviders } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from './users';
// import { environment } from './environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {
//   private apiServerUrl = environment.apiBaseUrl;

//   constructor(private http: HttpClient) { }

//   public getUsers(): Observable<any> {
//     return this.http.get<any>(`${this.apiServerUrl}/users`);
//   }

//   public addUsers(user: User): Observable<any> {
//     return this.http.post<any>(`${this.apiServerUrl}/users`, user);
//   }

//   public updateUsers(userId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiServerUrl}/users/${userId}`);
//   }

//   public deleteUsers(userId: number): Observable<any> {
//     return this.http.get<any>(`${this.apiServerUrl}/users/${userId}`);
//   }


// }
