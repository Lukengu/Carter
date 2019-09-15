import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'app-watchlist',
  templateUrl: '../favourites/favourites.component.html'
})
export class WatchlistComponent implements OnInit {
  
  total_pages:number[];
  results: any[];  

  constructor(private accountService: AccountService,) { }
	
  ngOnInit() {
	 this.get_watchlist(0);
  }

  get_watchlist(page:number) {
		
		this.accountService.watchListMovies(page).subscribe(
			(watchlist:any) => {
				this.results = watchlist.results;
			
				this.total_pages = [];
				for( var i = 1 ; i <= watchlist.total_pages; i++ ) {
					this. total_pages.push(i);
				}
			}
		);
	}

}
