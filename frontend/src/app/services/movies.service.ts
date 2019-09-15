import { Injectable } from '@angular/core';
import {endpoint} from '../../environments/global';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {}

  public search(query:string, page:number): Observable<any[]> {
	return this.http.get<any[]>(`${endpoint}/search/movie?query=${query}&page=${page}`);
  }

}
