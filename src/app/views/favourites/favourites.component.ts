import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AuthService} from "../../services/auth.service";

//import * as $ from 'jquery';
//import 'datatables.net';
//import 'datatables.net-bs4';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html'
})
export class FavouritesComponent implements OnInit {

  total_pages:number[];
  results: any[];  
  //dataTable: any;

  constructor(
	private accountService: AccountService,
    private authService: AuthService) { }

  ngOnInit() {
	 this.authService.create_access();
	 this.get_favourites(0);
  }

  get_favourites(page:number) {
	let account = JSON.parse(localStorage.getItem('account'));
	this.accountService.favoutiteMovies(account.id, localStorage.getItem("session_id"),page).subscribe(
		(favourites:any) => {
			this.results = favourites.results;
			
   			// this.dataTable = table.DataTable();
			this.total_pages = [];
			for( var i = 1 ; i <= favourites.total_pages; i++ ){
				this. total_pages.push(i);
			}
		}
	);
	
  }

}
