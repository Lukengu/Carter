import { Injectable } from '@angular/core';
import {endpoint,api_key} from '../../environments/global';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  get(session_id:string): Observable<any[]> {
	  return this.http.get<any[]>(`${endpoint}/account?api_key=${api_key}&session_id=${session_id}`);
  }
  markFavourite(post:any, account_id:number, session_id:string): Promise<any>{
	 let promise = null;
	  promise = new Promise<any>((resolve, reject) => {
        this.http.post(`${endpoint}/account/${account_id}/favorite?api_key=${api_key}&session_id=${session_id}`, post  )
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
 addToWatchList(post:any, account_id:number, session_id:string): Promise<any>{
	 let promise = null;
	  promise = new Promise<any>((resolve, reject) => {
        this.http.post(`${endpoint}/account/${account_id}/watchlist?api_key=${api_key}&session_id=${session_id}`, post  )
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

 favoutiteMovies(account_id:number,session_id:string,page:number): Observable<any[]> {
	 let link =  page == 0 ? `${endpoint}/account/${account_id}/favorite/movies?api_key=${api_key}&session_id=${session_id}`
	 : `${endpoint}/account/${account_id}/favorite/movies?api_key=${api_key}&session_id=${session_id}?page=${page}`;

	 return this.http.get<any[]>(link);
 }
 
 watchListMovies(account_id:number,session_id:string,page:number): Observable<any[]> {
	 let link =  page == 0 ? `${endpoint}/account/${account_id}/watchlist/movies?api_key=${api_key}&session_id=${session_id}`
	 : `${endpoint}/account/${account_id}/watchlist/movies?api_key=${api_key}&session_id=${session_id}?page=${page}`;

	 return this.http.get<any[]>(link);	
 }

 
  
}



 
  
