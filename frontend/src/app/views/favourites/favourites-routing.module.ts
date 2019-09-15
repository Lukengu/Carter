import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites.component';

const routes: Routes = [
	{
		path: '',
		component: FavouritesComponent,
		data: {
			title: 'Favourites'
		}
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritesRoutingModule { }
