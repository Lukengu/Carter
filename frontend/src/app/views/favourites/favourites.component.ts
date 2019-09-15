import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";


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
	private accountService: AccountService) { }

  ngOnInit() {
	 this.get_favourites(0);
  }

  get_favourites(page:number) {
	
	this.accountService.favoutiteMovies(page).subscribe(
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
