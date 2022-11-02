import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ResponseModel} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  // @ts-ignore
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  // @ts-ignore
  userData$ = new BehaviorSubject<ResponseModel | object>(null);
  // @ts-ignore
  loginMessage$ = new BehaviorSubject<string>(null);
  // @ts-ignore
  userRole: number;

  constructor(private http: HttpClient) { }

  /* Login User with Email and Password */
  loginUser(email: string, password: string) {
    return this.http.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if(typeof(data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(this.auth);
          this.userData$.next(data);
          console.log(this.userData$);
        }
      });
  }


  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
  }

  registerUser(formData: any): Observable<{ message: string }> {
    const {username, fname, lname, email, password, age} = formData;
    return this.http.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {
      username,
      email,
      fname,
      lname,
      password,
      age
    });
  }

}
