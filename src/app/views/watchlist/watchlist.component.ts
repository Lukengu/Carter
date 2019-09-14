import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: '../favourites/favourites.component.html'
})
export class WatchlistComponent implements OnInit {
  
  total_pages:number[];
  results: any[];  

  constructor(private accountService: AccountService,
    private authService: AuthService) { }
	
  ngOnInit() {
	 this.authService.create_access();
	 this.get_watchlist(0);
  }

  get_watchlist(page:number) {
		let account = JSON.parse(localStorage.getItem('account'));
		this.accountService.watchListMovies(account.id, localStorage.getItem("session_id"),page).subscribe(
			(watchlist:any) => {
				this.results = watchlist.results;
				console.log(this.results);
				// const table: any = $('table');
	   			// this.dataTable = table.DataTable();
				this.total_pages = [];
				for( var i = 1 ; i <= watchlist.total_pages; i++ ) {
					this. total_pages.push(i);
				}
			}
		);
	}

}
