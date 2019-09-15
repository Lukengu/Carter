import { Injectable } from '@angular/core';
import {endpoint} from '../../environments/global';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  
  markFavourite(post:any): Promise<any>{
	 let promise = null;
	  promise = new Promise<any>((resolve, reject) => {
        this.http.post(`${endpoint}/account/favourites`, post  )
          .toPromise()
          .then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            }
          );
      });
	  return promise;
 }
 addToWatchList(post:any): Promise<any>{
	 let promise = null;
	  promise = new Promise<any>((resolve, reject) => {
        this.http.post(`${endpoint}/account/watchlist`, post  )
          .toPromise()
          .then(
            res => {
              resolve(res);
            },
            error => {
              reject(error);
            }
          );
      });
	  return promise;
 }

 favoutiteMovies(page:number): Observable<any[]> {
	 return this.http.get<any[]>(`${endpoint}/account/favourites/${page}`);
 }
 
 watchListMovies(page:number): Observable<any[]> {
	 return this.http.get<any[]>(`${endpoint}/account/watchlist/${page}`);	
 }

 
  
}



 
  
