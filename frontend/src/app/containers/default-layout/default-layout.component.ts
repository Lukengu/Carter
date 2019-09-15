import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
	selector: 'app-dashboard',
	templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
	path: string = '';


	constructor(router: Router) {
		router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				console.log(event)
				this.path = event.url;
				this.path = this.path.replace("/", "").trim();

			}

		}
		);

	}

	ngOnInit() {



	}

}


