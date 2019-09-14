import { Injectable } from '@angular/core';
import {endpoint} from '../../environments/global';
import {api_key,username,password} from '../../environments/global';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {AccountService} from './account.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private accountService:AccountService) { }

	 create_session(request_token:string) : Promise<any>{
		return  new Promise<any>( (resolve, reject) => {
	        this.http.post(`${endpoint}/authentication/session/new?api_key=${api_key}`, {'request_token':request_token}  )
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
		 
	  }
      create_request_token() : Observable<any[]> {
		return this.http.get<any[]>(`${endpoint}/authentication/token/new?api_key=${api_key}`);
	 }
	 get_auth_token(request_token:string) : Promise<any>{
		return  new Promise<any>( (resolve, reject) => {
	        this.http.post(`${endpoint}/authentication/token/validate_with_login?api_key=${api_key}`,
			 {'request_token':request_token, 'username':username, 'password':password}  )
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
		 
	  }
	  
      create_access(){
			this.create_request_token().subscribe(
		(result:any) => {
			this.get_auth_token(result.request_token).then(
				auth => {
					this.create_session(auth.request_token).then(
						session => {
							let session_id = session.session_id;
							localStorage.setItem("session_id", session_id);
							this.accountService.get(session_id).subscribe(
								(account:any) =>  {
									localStorage.setItem("account", JSON.stringify(account));
									//leaccount = account;
									//console.log(this.account);
								}
							);
						}
					);
					
				}
			);
			
		}
	);
	  }
	  
}
