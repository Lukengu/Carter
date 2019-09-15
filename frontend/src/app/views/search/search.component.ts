import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from "../../services/movies.service";
import {AccountService} from "../../services/account.service";

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
    private accountService: AccountService) { }
	

  ngOnInit() {
	 this.search_form = this.formBuilder.group({
      query : ['', Validators.required],
  
    });
	
	
	

  }

  favourite(id:number){
	let post: any = 
		{
		  "media_type": "MOVIE",
		  "media_id": id,
		  "favorite": true
	    }
		
		this.accountService.markFavourite(post).then(
			res => {
				alert(res.status_message);
			}, err => {
				console.log(err);
			}
		);
  }

	watch_list(id:number){
		let post: any = 
			{
			  "media_type": "MOVIE",
			  "media_id": id,
			  "watchlist": true
		    }
			
			this.accountService.addToWatchList(post).then(
				res => {
					alert(res.status_message);
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
