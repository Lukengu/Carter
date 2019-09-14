import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from "../../services/movies.service";
import {AccountService} from "../../services/account.service";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import swal from 'sweetalert2';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  search_form : FormGroup;
  results: any[] ;
  total_pages:number[] = [];
  account:any;
 // request_token:string;
  session_id:string;

  constructor(  private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private accountService: AccountService,
    private authService: AuthService) { }
	

  ngOnInit() {
	 this.search_form = this.formBuilder.group({
      query : ['', Validators.required],
  
    });
	
	this.authService.create_access();
	
   	/*this.authService.create_request_token().subscribe(
		(result:any) => {
			this.authService.get_auth_token(result.request_token).then(
				auth => {
					this.authService.create_session(auth.request_token).then(
						session => {
							this.session_id = session.session_id;
							this.accountService.get(this.session_id).subscribe(
								(account:any) =>  {
									this.account = account;
									//console.log(this.account);
								}
							);
						}
					);
					
				}
			);
			
		}
	);*/
   
	

  }

  favourite(id:number){
	let post: any = 
		{
		  "media_type": "movie",
		  "media_id": id,
		  "favorite": true
	    }
		let account = JSON.parse(localStorage.getItem("account"));
		this.accountService.markFavourite(post, account.id, localStorage.getItem("session_id")).then(
			res => {
				alert("Success");
			}, err => {
				console.log(err);
			}
		);
  }

	watch_list(id:number){
		let post: any = 
			{
			  "media_type": "movie",
			  "media_id": id,
			  "watchlist": true
		    }
			let account = JSON.parse(localStorage.getItem("account"));
			this.accountService.addToWatchList(post, account.id, localStorage.getItem("session_id")).then(
				res => {
					alert("Success");
				}, err => {
					console.log(err);
				}
			);
	  }

  search(page:number) {
	let query:string = this.search_form.get("query").value;
	this.moviesService.search(query,page).subscribe((data: any) => {
        console.log(data);    
		this.results = data.results;
		this.total_pages = [];
		for( var i = 1 ; i <= data.total_pages; i++ ){
			this. total_pages.push(i);
		}
		//this. total_pages =  Array(data.total_pages).fill().map((x,i)=>i);
		this.search_form.get("query").setValue(query);
    });
  }

 get f() { return this.search_form.controls; }

}
