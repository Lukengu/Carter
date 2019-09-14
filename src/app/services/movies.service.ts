import { Injectable } from '@angular/core';
import {endpoint} from '../../environments/global';
import {api_key} from '../../environments/global';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {}

  public search(query:string, page:number): Observable<any[]> {
	let link = page == 0 ? `${endpoint}/search/movie?api_key=${api_key}&query=${query}&language=en-US`:
	`${endpoint}/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=en-US`;
	
    return this.http.get<any[]>(link);
  }

}
